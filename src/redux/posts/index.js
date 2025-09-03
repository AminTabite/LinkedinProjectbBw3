import { TOKEN } from '../../config/constants';

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
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const posts = await response.json();
        dispatch({ type: "GET_POSTS_SUCCESS", payload: posts });
      } else {
        throw new Error("Impossibile recuperare i post");
      }
    } catch (error) {
      dispatch({ type: "GET_POSTS_ERROR", payload: error.message });
    }
  };
};

export const aggiungiPostAction = (datiPost) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
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
          "Authorization": `Bearer ${TOKEN}`,
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
          "Authorization": `Bearer ${TOKEN}`,
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
