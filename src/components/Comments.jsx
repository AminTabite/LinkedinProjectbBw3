import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import {
  ottieniCommentiAction,
  creaCommentoAction,
  eliminaCommentoAction,
} from "../redux/comments/index";
import clientApi from "../services/api";
import "./Homecolcentrale.css";

const Comments = ({ postId, isVisible, onToggle, userProfile }) => {
  const dispatch = useDispatch();
  const [testoCommento, setTestoCommento] = useState("");
  const { user } = useSelector((state) => state.auth);
  const comments = useSelector(
    (state) => state.comments?.comments?.[postId] || []
  );
  const loading = useSelector((state) => state.comments.loading);
  const commentsInfo = useSelector(
    (state) => state.comments?.allComments?.[postId] || {}
  );

  useEffect(() => {
    if (isVisible && postId) {
      dispatch(ottieniCommentiAction(postId));
    }
  }, [dispatch, postId, isVisible]);

  const inviaCommento = async (e) => {
    e.preventDefault();
    if (!testoCommento.trim()) return;

    const datiCommento = {
      comment: testoCommento,
      rate: 5,
      elementId: postId,
    };

    dispatch(creaCommentoAction(postId, datiCommento));
    setTestoCommento("");
  };

  const eliminaCommento = (commentId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo commento?")) {
      dispatch(eliminaCommentoAction(commentId, postId));
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-3 border-top pt-3 commentsArea">
      {/* Form per aggiungere commento */}
      <div className="d-flex align-items-start gap-2 mb-3">
        <img
          src={
            userProfile?.image ||
            user?.image ||
            "https://via.placeholder.com/32x32/0a66c2/ffffff?text=" +
              (user?.name?.charAt(0) || "U")
          }
          alt="profilo"
          className="rounded-circle"
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
          }}
        />
        <Form onSubmit={inviaCommento} className="flex-grow-1">
          <div className="d-flex align-items-end gap-2">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Aggiungi un commento..."
              value={testoCommento}
              onChange={(e) => setTestoCommento(e.target.value)}
              className="border rounded-pill px-3 py-2 flex-grow-1"
              style={{
                resize: "none",
                minHeight: "40px",
                backgroundColor: "#f3f2ef",
                border: "1px solid #d3d3d3",
                fontSize: "14px",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  inviaCommento(e);
                }
              }}
            />
            <Button
              variant="link"
              type="submit"
              className="p-1"
              style={{
                color: "#0a66c2",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: "600",
              }}
              disabled={!testoCommento.trim()}
            >
              Pubblica
            </Button>
          </div>
        </Form>
      </div>

      {/* Lista commenti */}
      {loading && (
        <div className="text-center py-3">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Caricamento commenti...</span>
          </div>
        </div>
      )}

      {/* Indicatore commenti totali */}
      {commentsInfo.total > 5 && (
        <div className="text-start mb-2">
          <Button
            variant="link"
            className="p-0 text-muted small"
            style={{ textDecoration: "none", fontSize: "12px" }}
          >
            Visualizza tutti i {commentsInfo.total} commenti
          </Button>
        </div>
      )}

      {comments.length > 0 && (
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div
              key={comment._id || index}
              className="d-flex align-items-start gap-2 mb-3"
            >
              <img
                src={
                  comment.author === user.name
                    ? userProfile?.image
                    : "https://placehold.co/32x32"
                }
                alt="profilo"
                className="rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "cover",
                }}
              />
              <div className="flex-grow-1">
                <Card
                  className="border-0"
                  style={{
                    backgroundColor: "#f3f2ef",
                    borderRadius: "16px",
                  }}
                >
                  <Card.Body className="px-3 py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6
                          className="mb-1"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          {comment.author || "Utente Anonimo"}
                        </h6>
                        <p
                          className="mb-0"
                          style={{ fontSize: "14px", lineHeight: "1.3" }}
                        >
                          {comment.comment}
                        </p>
                      </div>
                      {/* Pulsante elimina per i propri commenti */}
                      {(comment.author === userProfile?.name ||
                        comment.author === user?.name ||
                        comment.author?.name === userProfile?.name ||
                        comment.author?.name === user?.name ||
                        comment.author?._id === userProfile?._id ||
                        comment.author?._id === user?._id ||
                        comment._id?.startsWith("mock-")) && (
                        <Button
                          variant="link"
                          className="text-muted p-0 ms-2"
                          style={{ fontSize: "12px" }}
                          onClick={() => eliminaCommento(comment._id)}
                          title="Elimina commento"
                        >
                          <i className="bi bi-x"></i>
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>

                {/* Meta info del commento */}
                <div className="d-flex align-items-center gap-3 mt-1 ms-2">
                  <span className="small text-muted">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString("it-IT", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Adesso"}
                  </span>
                  <Button
                    variant="link"
                    className="p-0 small text-muted"
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Mi piace
                  </Button>
                  <Button
                    variant="link"
                    className="p-0 small text-muted"
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Rispondi
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messaggio quando non ci sono commenti */}
      {!loading && comments.length === 0 && (
        <div
          className="text-center text-muted py-3"
          style={{ fontSize: "14px" }}
        >
          Nessun commento ancora. Sii il primo a commentare!
        </div>
      )}
    </div>
  );
};

export default Comments;
