import { getToken } from '../../config/constants';

const initialState = {
  postsArray: [],
  displayedPosts: [],
  currentPage: 0,
  postsPerPage: 10,
  hasMorePosts: true,
  loading: false,
  error: null,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_POSTS_SUCCESS":
      const firstTenPosts = action.payload.slice(0, state.postsPerPage);
      return {
        ...state,
        loading: false,
        postsArray: action.payload,
        displayedPosts: firstTenPosts,
        currentPage: 1,
        hasMorePosts: action.payload.length > state.postsPerPage,
      };
    case "LOAD_MORE_POSTS":
      const startIndex = state.currentPage * state.postsPerPage;
      const endIndex = startIndex + state.postsPerPage;
      const newPosts = state.postsArray.slice(startIndex, endIndex);
      const updatedDisplayedPosts = [...state.displayedPosts, ...newPosts];
      return {
        ...state,
        displayedPosts: updatedDisplayedPosts,
        currentPage: state.currentPage + 1,
        hasMorePosts: endIndex < state.postsArray.length,
      };
    case "GET_POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_POST_SUCCESS":
      const newPostsArray = [action.payload, ...state.postsArray];
      const newDisplayedPosts = [action.payload, ...state.displayedPosts];
      return {
        ...state,
        postsArray: newPostsArray,
        displayedPosts: newDisplayedPosts,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        postsArray: state.postsArray.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
        displayedPosts: state.displayedPosts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        postsArray: state.postsArray.filter(post => post._id !== action.payload),
        displayedPosts: state.displayedPosts.filter(post => post._id !== action.payload),
      };
    case "SORT_POSTS_BY_DATE":
      const sortedPosts = [...state.postsArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const sortedDisplayedPosts = sortedPosts.slice(0, state.currentPage * state.postsPerPage);
      return {
        ...state,
        postsArray: sortedPosts,
        displayedPosts: sortedDisplayedPosts,
      };

    default:
      return state;
  }
};

// Creatori di azioni
export const ottieniPostAction = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_POSTS_START" });
    try {
      const token = getToken();
      if (!token) {
        // Se non c'è token, usa dati mock
        const mockPosts = [
          {
            "_id": "mock1",
            "text": "Benvenuti su LinkedIn! (Modalità demo - effettua login con token valido per i post reali)",
            "user": { "name": "Demo User", "image": null },
            "createdAt": new Date().toISOString()
          }
        ];
        dispatch({ type: "GET_POSTS_SUCCESS", payload: mockPosts });
        return;
      }

      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const posts = await response.json();
        dispatch({ type: "GET_POSTS_SUCCESS", payload: posts });
      } else if (response.status === 401) {
        // Token non valido, usa dati mock
        const mockPosts = [
          {
            "_id": "mock1",
            "text": "Token non valido - usa dati demo (aggiorna il token nel file users.json per i post reali)",
            "user": { "name": "Demo User", "image": null },
            "createdAt": new Date().toISOString()
          }
        ];
        dispatch({ type: "GET_POSTS_SUCCESS", payload: mockPosts });
      } else {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error("Errore nel caricamento posts:", error);
      // Fallback finale con dati mock
      const mockPosts = [
        {
          "_id": "mock1",
          "text": "Errore di connessione - modalità offline",
          "user": { "name": "Sistema", "image": null },
          "createdAt": new Date().toISOString()
        }
      ];
      dispatch({ type: "GET_POSTS_SUCCESS", payload: mockPosts });
    }
  };
};

export const aggiungiPostAction = (datiPost) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiPost),
      });
      if (response.ok) {
        const nuovoPost = await response.json();
        dispatch({ type: "ADD_POST_SUCCESS", payload: nuovoPost });
      } else {
        throw new Error("Impossibile creare il post");
      }
    } catch (error) {
      console.error("Errore nella creazione del post:", error);
    }
  };
};

export const aggiornaPostAction = (idPost, datiPost) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${idPost}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiPost),
      });
      if (response.ok) {
        const postAggiornato = await response.json();
        dispatch({ type: "UPDATE_POST_SUCCESS", payload: postAggiornato });
      } else {
        throw new Error("Impossibile aggiornare il post");
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del post:", error);
    }
  };
};

export const eliminaPostAction = (idPost) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${idPost}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      });
      if (response.ok) {
        dispatch({ type: "DELETE_POST_SUCCESS", payload: idPost });
      } else {
        throw new Error("Impossibile eliminare il post");
      }
    } catch (error) {
      console.error("Errore nell'eliminazione del post:", error);
      throw error;
    }
  };
};

// Action per caricare più post
export const caricaPiuPostAction = () => {
  return {
    type: "LOAD_MORE_POSTS"
  };
};

// Action per ordinare i post per data (più recenti prima)
export const ordinaPostPerDataAction = () => {
  return {
    type: "SORT_POSTS_BY_DATE"
  };
};

export default PostsReducer;
