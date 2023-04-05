import {
    Grid,
    Box,
    Typography,
    useTheme,
    TextField,
    FormControl,
    CircularProgress,
    Button,
    OutlinedInput,
    InputLabel,
    FormHelperText,
    IconButton,
    FormControlLabel,
    Switch,
    FormGroup,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useAddUserMutation } from "../../features/users/userApiSlice";
import RegisterSchema from "../../utils/validationSchema/RegisterSchema";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
const MySwal = withReactContent(Swal);

const CreateUser = () => {
    const [attachmentsFile, setAttachmentsFile] = useState(null)
    const [image, setImage] = useState(null)

    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const abilityOptions = [
        { label: "All", value: "all" },
        { label: "Create", value: "create" },
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
        { label: "Read", value: "read" },
    ];

    const subjectsOption = [
        { value: "humanResources", label: "Human Resources" },
        { value: "media", label: "Media" },
        { value: "technical", label: "Technical" },
        { value: "finance", label: "Finance" },
    ];

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" }
    ];

    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(RegisterSchema),
    });

    const isActive = useWatch({
        control,
        name: "isActive",
        defaultValue: true,
    });

    const canChat = useWatch({
        control,
        name: "canChat",
        defaultValue: false,
    });

    const [addUser, { isLoading, isSuccess, isError, error }] =
        useAddUserMutation();

    const onChange = (e) => {
        const reader = new FileReader()
        const files = e.target.files
        reader.onload = () => {
            setImage(reader.result)
            setAttachmentsFile(e.target.files[0])
        }
        reader.readAsDataURL(files[0])
    }

    const onSubmitHandler = async (data) => {
        try {
            data.image = attachmentsFile
            data.gender = data.gender?.value
            data.role = data?.subject?.value
            data.ability = data?.ability?.map(ability => ability.value).join(',')
            data.isActive = isActive
            data.canChat = canChat

            const formData = new FormData()
            for (const property in data) {
                formData.append(property, data[property])
            }

            await addUser(formData).unwrap();
            await MySwal.fire({
                title: t("success"),
                text: t("messages:success", { key: "" }),
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            reset();
            navigate("/dashboard/users");

        } catch (rejectResp) {
            const { data } = rejectResp;

            if (data?.errors) {
                data.errors.forEach((error) =>
                    setError(error["param"], { type: "manual", message: error["msg"] })
                );
            } else {
                MySwal.fire({
                    title: t("error"),
                    text: t("messages:failed"),
                    icon: "warning",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        }
    };

    return (
        <Grid container sx={{ mt: "10px", mb: "20px" }} gap="20px">
            <Grid item xs={12} sm={7}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.bgColor[1000],
                            width: "100%",
                            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
                            borderRadius: "5px",
                        }}
                    >
                        <Typography variant="body1" sx={{ pt: "10px", pl: "10px" }}>
                            User General Info
                        </Typography>
                        <Box
                            noValidate
                            autoComplete="off"
                            sx={{ p: "20px", width: "100%" }}
                        >
                            <FlexBetween>
                                <TextField
                                    {...register("fullName", { required: true })}
                                    fullWidth
                                    id="fullName"
                                    label="FullName"
                                    variant="outlined"
                                    error={errors.fullName && true}
                                    helperText={errors.fullName?.message}
                                    sx={{
                                        mr: "10px",
                                        "& .MuiFormLabel-root": {
                                            "&.Mui-focused": {
                                                color: theme.palette.grey[900],
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    {...register("username", { required: true })}
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    error={errors.username && true}
                                    helperText={errors.username?.message}
                                    sx={{
                                        mr: "10px",
                                        "& .MuiFormLabel-root": {
                                            "&.Mui-focused": {
                                                color: theme.palette.grey[900],
                                            },
                                        },
                                    }}
                                />

                            </FlexBetween>

                            <FlexBetween sx={{ mt: "20px" }}>
                                <TextField
                                    {...register("email", { required: true })}
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    error={errors.email && true}
                                    helperText={errors.email?.message}
                                    sx={{
                                        mr: "10px",
                                        "& .MuiFormLabel-root": {
                                            "&.Mui-focused": {
                                                color: theme.palette.grey[900],
                                            },
                                        },
                                    }}
                                />
                                <FormControl
                                    fullWidth
                                    sx={{
                                        ".select__control": {
                                            backgroundColor: theme.palette.bgColor[1000],
                                            padding: "7px",
                                            borderColor: theme.palette.black[1100],
                                            "&:hover": {
                                                borderColor: theme.palette.grey[900],
                                            },
                                        },
                                        ".select__placeholder": {
                                            color: theme.palette.grey[1100],
                                        },
                                        ".select__menu": {
                                            backgroundColor: theme.palette.bgColor.main,
                                            zIndex: 10000,
                                            "& > div": {
                                                "& > div": {
                                                    backgroundColor: theme.palette.bgColor.main,
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.primary[700],
                                                    },
                                                },
                                            },
                                        },
                                        ".select__single-value": {
                                            color: theme.palette.grey[900],
                                        },
                                    }}
                                >
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    controlShouldRenderValue={true}
                                                    options={genderOptions}
                                                    id="gender"
                                                    name="gender"
                                                    placeholder={t("gender")}
                                                    className={`form-multi-select react-select ${errors.gender?.label && "is-invalid"
                                                        }`}
                                                    classNamePrefix="select"
                                                    errorText={true}
                                                    aria-invalid={errors.gender && true}
                                                    aria-errormessage="gender-invalid"
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </FormControl>
                            </FlexBetween>

                            <FlexBetween sx={{ mt: "20px" }}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mr: "10px",
                                        ".select__control": {
                                            backgroundColor: theme.palette.bgColor[1000],
                                            padding: "7px",
                                            borderColor: theme.palette.black[1100],
                                            "&:hover": {
                                                borderColor: theme.palette.grey[900],
                                            },
                                        },
                                        ".select__placeholder": {
                                            color: theme.palette.grey[1100],
                                        },

                                        ".select__menu": {
                                            backgroundColor: theme.palette.bgColor.main,
                                            zIndex: 10000,
                                            "& > div": {
                                                "& > div": {
                                                    backgroundColor: theme.palette.bgColor.main,
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.primary[700],
                                                    },
                                                },
                                            },
                                        },
                                        ".select__single-value": {
                                            color: theme.palette.grey[900],
                                        },
                                    }}
                                >
                                    <Controller
                                        name="subject"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    name="subject"
                                                    cacheOptions
                                                    defaultOptions
                                                    id="subject"
                                                    placeholder={t("Role")}
                                                    noResultsText={t("no-info")}
                                                    isClearable={true}
                                                    options={subjectsOption}
                                                    className={`form-multi-select react-select ${errors.subject?.label && " is-invalid"
                                                        }`}
                                                    classNamePrefix="select"
                                                    errorText={true}
                                                    aria-invalid={errors.subject?.label && true}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mr: "10px",
                                        ".select__control": {
                                            backgroundColor: theme.palette.bgColor[1000],
                                            padding: "7px",
                                            borderColor: theme.palette.black[1100],
                                            "&:hover": {
                                                borderColor: theme.palette.grey[900],
                                            },
                                        },
                                        ".select__placeholder": {
                                            color: theme.palette.grey[1100],
                                        },

                                        ".select__menu": {
                                            backgroundColor: theme.palette.bgColor.main,
                                            zIndex: 10000,
                                            "& > div": {
                                                "& > div": {
                                                    backgroundColor: theme.palette.bgColor.main,
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.primary[700],
                                                    },
                                                },
                                            },
                                        },
                                        ".select__single-value": {
                                            color: theme.palette.grey[900],
                                        },
                                    }}
                                >
                                    <Controller
                                        name="ability"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    name="ability"
                                                    cacheOptions
                                                    defaultOptions
                                                    id="ability"
                                                    placeholder={t("Ability")}
                                                    noResultsText={t("no-info")}
                                                    isClearable={true}
                                                    options={abilityOptions}
                                                    className={`form-multi-select react-select ${errors.ability?.label && " is-invalid"
                                                        }`}
                                                    classNamePrefix="select"
                                                    errorText={true}
                                                    isMulti
                                                    aria-invalid={errors.ability?.label && true}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </FormControl>
                            </FlexBetween>

                            <FlexBetween>
                                <FormControl
                                    error={errors.password && true}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mt: "20px",
                                        ".MuiFormLabel-root": {
                                            "&.Mui-focused": {
                                                color: theme.palette.grey[900],
                                            },
                                        },
                                    }}
                                >
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        {...register("password", { required: true })}
                                        type="password"
                                        label="Password"
                                    />
                                    <FormHelperText>
                                        {errors.password?.message}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl
                                    error={errors.confirmPassword && true}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mt: "20px",
                                        ".MuiFormLabel-root": {
                                            "&.Mui-focused": {
                                                color: theme.palette.grey[900],
                                            },
                                        },
                                    }}
                                >
                                    <InputLabel htmlFor="confirmPassword">confirmPassword</InputLabel>
                                    <OutlinedInput
                                        {...register("confirmPassword", { required: true })}
                                        type="password"
                                        label="ConfirmPassword"
                                    />
                                    <FormHelperText>
                                        {errors.confirmPassword?.message}
                                    </FormHelperText>
                                </FormControl>
                            </FlexBetween>

                            <FormGroup>
                                <FormControlLabel {...register("isActive")} control={<Switch defaultChecked />} label="IsActive" />
                                <FormControlLabel {...register("canChat")} control={<Switch />} label="Is Able To Chat?" />
                            </FormGroup>

                            <FlexBetween sx={{ mt: "20px" }}>
                                <FlexBetween>
                                    <Typography sx={{ mr: "10px" }}>Choice your photo</Typography>
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={onChange}
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </FlexBetween>
                                <Box>
                                    <img src={image && image} width="120px" height="120px" />
                                </Box>
                            </FlexBetween>
                        </Box>

                        <Box
                            sx={{
                                p: "20px",
                            }}
                        >

                            <Box display="flex" alignItems="center">
                                <Box sx={{ position: "relative", mt: "20px" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            color: theme.palette.light[100],
                                            backgroundColor: theme.palette.primary.main,
                                            fontWeight: "bold",
                                            boxShadow: "none",
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary[400],
                                            },
                                        }}
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {" "}
                                        ADD User
                                        {isSubmitting && (
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: theme.palette.primary[400],
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%,-50%) !important",
                                                }}
                                            />
                                        )}
                                    </Button>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="outlined"
                                    sx={{
                                        mt: "20px",
                                        ml: "10px",
                                        color: theme.palette.light[100],
                                        borderColor: theme.palette.primary.main,
                                        fontWeight: "bold",
                                        boxShadow: "none",
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary[400],
                                        },
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default CreateUser;
