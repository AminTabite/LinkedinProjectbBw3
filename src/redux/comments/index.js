import { getToken } from '../../config/constants';
import clientApi from '../../services/api';

const initialState = {
  comments: {},
  allComments: {},
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
          [action.payload.elementId]: action.payload.data.comments
        },
        allComments: {
          ...state.allComments,
          [action.payload.elementId]: {
            total: action.payload.data.total,
            hasMore: action.payload.data.hasMore
          }
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
      const newCommentsList = [action.payload, ...existingComments];
      const recentComments = newCommentsList.slice(0, 5);
      
      return {
        ...state,
        comments: {
          ...state.comments,
          [elementId]: recentComments
        },
        allComments: {
          ...state.allComments,
          [elementId]: {
            ...state.allComments[elementId],
            total: (state.allComments[elementId]?.total || 0) + 1,
            hasMore: (state.allComments[elementId]?.total || 0) + 1 > 5
          }
        }
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

export const ottieniCommentiAction = (elementId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_COMMENTS_START" });
    try {
      const data = await clientApi.ottieniCommenti(elementId);
      dispatch({ 
        type: "GET_COMMENTS_SUCCESS", 
        payload: { elementId, data }
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
      const commentoConElementId = {
        ...nuovoCommento,
        elementId: elementId
      };
      dispatch({ type: "ADD_COMMENT_SUCCESS", payload: commentoConElementId });
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