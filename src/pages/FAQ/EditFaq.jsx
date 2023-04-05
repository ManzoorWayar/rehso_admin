import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useUpdateFaqMutation } from "../../features/faq/faqApiSlice";
import { selectFaqById } from "../../features/faq/faqApiSlice";
import { useSelector } from "react-redux";

const EditFaq = ({ showModal, setShowModal, id }) => {
  const theme = useTheme();
  const faq = useSelector((state) => selectFaqById(state, id));

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [updateFaq, { isLoading, isSuccess, isError, error }] =
    useUpdateFaqMutation();

  useEffect(() => {
    if (isSuccess) {
      setQuestion('')
      setAnswer('')
    }

    if (faq) {
      setQuestion(faq?.question?.fa)
      setAnswer(faq?.answer?.fa)
    }

  }, [isSuccess, faq])

  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    await updateFaq({
      id,
      question: question === undefined ? faq?.question?.fa : question,
      answer: answer === undefined ? faq?.answer?.fa : answer
    });

    setShowModal(false)
  };

  return (
    <div>
      <Dialog open={showModal === 'edit'} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.bgColor[500],
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Edit Faq
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="question"
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            multiline
            defaultValue={faq?.question?.fa}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="answer"
            label="answer"
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            defaultValue={faq?.answer?.fa}
            multiline
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <Button
            onClick={handleClose}
            sx={{ color: theme.palette.error.main }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit} sx={{ color: theme.palette.primary[500] }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFaq;
