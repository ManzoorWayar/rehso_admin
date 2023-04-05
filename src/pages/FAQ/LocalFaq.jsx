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
import { useUpdateLocalFaqMutation } from "../../features/faq/faqApiSlice";

const CreateFaq = ({ showModal, setShowModal, id }) => {
    const [question_ps, setQuestion_ps] = useState('');
    const [answer_ps, setAnswer_ps] = useState('');
    const [question_en, setQuestion_en] = useState('');
    const [answer_en, setAnswer_en] = useState('');

    const theme = useTheme();

    const handleClose = () => {
        setShowModal(false);
    };

    const [updateLocal, { isLoading, isSuccess, isError, error }] = useUpdateLocalFaqMutation()

    const onSubmit = async (e) => {
        if (question_ps.trim() && answer_ps.trim() && question_en.trim() && answer_en.trim()) {
            await updateLocal({ id, question_en, answer_en, question_ps, answer_ps });
            setShowModal(false);
        }
    };

    return (
        <div>
            <Dialog open={showModal === 'local'} onClose={handleClose} fullWidth>
                <DialogTitle
                    sx={{
                        backgroundColor: theme.palette.bgColor[500],
                        textAlign: "center",
                        fontSize: "25px",
                        fontWeight: "bold",
                    }}
                >
                    Add Faq locals
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="question_ps"
                        label="Question Pashto"
                        onChange={(e) => setQuestion_ps(e.target.value)}
                        type="text"
                        multiline
                        defaultValue={question_ps}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="answer_ps"
                        label="Answer Pashto"
                        type="text"
                        onChange={(e) => setAnswer_ps(e.target.value)}
                        defaultValue={answer_ps}
                        multiline
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="question_en"
                        label="Question English"
                        onChange={(e) => setQuestion_en(e.target.value)}
                        type="text"
                        multiline
                        defaultValue={question_en}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="answer_en"
                        label="Answer English"
                        type="text"
                        onChange={(e) => setAnswer_en(e.target.value)}
                        defaultValue={answer_en}
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
        </div >
    );
};

export default CreateFaq;
