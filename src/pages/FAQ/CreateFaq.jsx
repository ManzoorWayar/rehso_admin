import { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useTheme,
} from "@mui/material";
import { useAddFaqMutation } from "../../features/faq/faqApiSlice";

const CreateFaq = ({ showModal, setShowModal }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const theme = useTheme();

    const handleClose = () => {
        setShowModal(false);
    };

    const [addFaq, { isLoading, isSuccess, isError, error }] = useAddFaqMutation()

    const onSubmit = async (e) => {
        if (question.trim() && answer.trim()) {
            await addFaq({ question, answer });
            setShowModal(false);
        }
    };

    return (
        <div>
            <Dialog open={showModal === 'create'} onClose={handleClose} fullWidth>
                <DialogTitle
                    sx={{
                        backgroundColor: theme.palette.bgColor[500],
                        textAlign: "center",
                        fontSize: "25px",
                        fontWeight: "bold",
                    }}
                >
                    Create Faq
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
                        defaultValue={question}
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
                        defaultValue={answer}
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
                    <Button onClick={onSubmit} sx={{ color: theme.palette.primary[500] }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateFaq;
