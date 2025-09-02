const initialState = {
  postsArray: [],
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
      return {
        ...state,
        loading: false,
        postsArray: action.payload,
      };
    case "GET_POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        postsArray: [action.payload, ...state.postsArray],
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        postsArray: state.postsArray.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        postsArray: state.postsArray.filter(post => post._id !== action.payload),
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
      // AGGIORNA IL TOKEN QUI CON QUELLO VALIDO
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk",
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
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk",
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
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk",
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
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVhNGMzZjBlYTI4NDAwMTUyOGI5MTciLCJpYXQiOjE3MzQwMDU4MjMsImV4cCI6MTczNTIxNTQyM30.SiOYiD0H9T1aJMwDvgnfA1xzWOlmnfX1K8k_nIx3vs",
        },
      });
      if (response.ok) {
        dispatch({ type: "DELETE_POST_SUCCESS", payload: idPost });
      } else {
        throw new Error("Impossibile eliminare il post");
      }
    } catch (error) {
      console.error("Errore nell'eliminazione del post:", error);
    }
  };
};

export default PostsReducer;
