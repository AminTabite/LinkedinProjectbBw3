import { getToken } from '../../config/constants';
import clientApi from '../../services/api';

const initialState = {
  comments: {},
  loading: false,
  error: null,
};

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: {
          ...state.comments,
          [action.payload.elementId]: action.payload.comments
        },
      };
    case "GET_COMMENTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_COMMENT_SUCCESS":
      const elementId = action.payload.elementId;
      const existingComments = state.comments[elementId] || [];
      return {
        ...state,
        comments: {
          ...state.comments,
          [elementId]: [...existingComments, action.payload]
        },
      };
    case "UPDATE_COMMENT_SUCCESS":
      const updatedComment = action.payload;
      const postId = updatedComment.elementId;
      const postComments = state.comments[postId] || [];
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: postComments.map(comment =>
            comment._id === updatedComment._id ? updatedComment : comment
          )
        },
      };
    case "DELETE_COMMENT_SUCCESS":
      const { commentId, elementId: postElementId } = action.payload;
      const commentsForPost = state.comments[postElementId] || [];
      return {
        ...state,
        comments: {
          ...state.comments,
          [postElementId]: commentsForPost.filter(comment => comment._id !== commentId)
        },
      };
    default:
      return state;
  }
};

// Action creators
export const ottieniCommentiAction = (elementId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_COMMENTS_START" });
    try {
      const comments = await clientApi.ottieniCommenti(elementId);
      dispatch({ 
        type: "GET_COMMENTS_SUCCESS", 
        payload: { elementId, comments }
      });
    } catch (error) {
      console.error("Errore nel caricamento commenti:", error);
      dispatch({ type: "GET_COMMENTS_ERROR", payload: error.message });
    }
  };
};

export const creaCommentoAction = (elementId, datiCommento) => {
  return async (dispatch) => {
    try {
      const nuovoCommento = await clientApi.creaCommento(elementId, datiCommento);
      dispatch({ type: "ADD_COMMENT_SUCCESS", payload: nuovoCommento });
    } catch (error) {
      console.error("Errore nella creazione del commento:", error);
    }
  };
};

export const aggiornaCommentoAction = (commentId, datiCommento) => {
  return async (dispatch) => {
    try {
      const commentoAggiornato = await clientApi.aggiornaCommento(commentId, datiCommento);
      dispatch({ type: "UPDATE_COMMENT_SUCCESS", payload: commentoAggiornato });
    } catch (error) {
      console.error("Errore nell'aggiornamento del commento:", error);
    }
  };
};

export const eliminaCommentoAction = (commentId, elementId) => {
  return async (dispatch) => {
    try {
      await clientApi.eliminaCommento(commentId);
      dispatch({ 
        type: "DELETE_COMMENT_SUCCESS", 
        payload: { commentId, elementId }
      });
    } catch (error) {
      console.error("Errore nell'eliminazione del commento:", error);
    }
  };
};

export default CommentsReducer;