import {
  Grid,
  Box,
  Typography,
  useTheme,
  TextField,
  FormControl,
  CircularProgress,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useAddPackageMutation } from "../../features/packages/packagesApiSlice";
import PackageSchema from "../../utils/validationSchema/PackageSchema";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const MySwal = withReactContent(Swal);

const CreatePackage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const provinceOptions = [
    { label: "هرات", value: "herat" },
    { label: "کابل", value: "kabul" },
    { label: "مزار شریف", value: "mezar-e-sharif" },
    { label: "بادغیس", value: "badghis" },
    { label: "جلال آباد", value: "jalal-aabad" },
  ];

  const durationOptions = [
    { label: "ماهوار", value: 30 },
    { label: "2 ماه", value: 60 },
    { label: "3 ماه", value: 90 },
    { label: "6 ماه", value: 180 },
    { label: "سالانه", value: 365 },
  ];

  const bandwidthSignOptions = [
    { label: "کی بی", value: "1" },
    { label: "ام بی", value: "1024" },
    { label: "جی بی", value: "1048576" },
  ];

  const categoriesOption = [
    { label: "Unlimited", value: "635d05fa4274d922cbf16779" },
    { label: "Limited", value: "635d06094274d922cbf16780" },
    { label: "Hybrid", value: "635d06134274d922cbf1678a" },
    { label: "Nightly", value: "635d061c4274d922cbf16794" },
    { label: "Free Nightly", value: "63748c7a692c0de47bd73483" },
    { label: "Promotion", value: "63748cc3692c0de47bd73495" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(PackageSchema),
  });

  const [addPackage, { isLoading, isSuccess, isError, error }] =
    useAddPackageMutation();

  const isNew = useWatch({ control, name: "isNew", defaultValue: false });
  const packageType = useWatch({
    control,
    name: "type",
    defaultValue: "limited",
  });
  const isPackagePlus = useWatch({
    control,
    name: "is-package-plus",
    defaultValue: false,
  });

  const onSubmitHandler = async (data) => {
    try {
      data.category = data.category.value;
      data.duration = data.duration.value;
      data.priority = data.priority.value;
      data.province = data.province.value;
      data.isNew = isNew;
      data["is-package-plus"] = isPackagePlus && true;

      await addPackage(data).unwrap();
      await MySwal.fire({
        title: t("success"),
        text: t("messages:success", { key: "" }),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      reset();
      navigate("/dashboard/packages");
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
              General INfo
            </Typography>
            <Box
              noValidate
              autoComplete="off"
              sx={{ p: "20px", width: "100%" }}
            >
              <FlexBetween>
                <TextField
                  {...register("name", { required: true })}
                  fullWidth
                  id="name"
                  label="Package Name"
                  variant="outlined"
                  error={errors.name && true}
                  helperText={errors.name?.message}
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
                  {...register("slug", { required: true })}
                  fullWidth
                  id="slug"
                  label="Package Slug"
                  variant="outlined"
                  error={errors.slug && true}
                  helperText={errors.slug?.message}
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
                  {...register("price", { required: true })}
                  fullWidth
                  id="price"
                  label="Package Price"
                  variant="outlined"
                  error={errors.price && true}
                  helperText={errors.price?.message}
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
                    name="province"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          controlShouldRenderValue={true}
                          options={provinceOptions}
                          id="province"
                          name="province"
                          placeholder={t("province")}
                          className={`form-multi-select react-select ${
                            errors.province && "is-invalid"
                          }`}
                          classNamePrefix="select"
                          errorText={true}
                          aria-invalid={errors.province && true}
                          aria-errormessage="province-invalid"
                          {...field}
                        />
                      );
                    }}
                  />
                </FormControl>
              </FlexBetween>
              {isPackagePlus && (
                <TextField
                  {...register("plus-price", { required: true })}
                  fullWidth
                  id="plus-price"
                  label="Package Plus Price"
                  variant="outlined"
                  error={errors["plus-price"] && true}
                  helperText={errors["plus-price"]?.message}
                  sx={{
                    mt: "10px",
                    "& .MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: theme.palette.grey[900],
                      },
                    },
                  }}
                />
              )}
              <FlexBetween sx={{ mt: "20px" }}>
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
                    name="duration"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          controlShouldRenderValue={true}
                          options={durationOptions}
                          id="duration"
                          name="duration"
                          placeholder={t("Duration")}
                          className={`form-multi-select react-select ${
                            errors.duration && "is-invalid"
                          }`}
                          classNamePrefix="select"
                          errorText={true}
                          aria-invalid={errors.duration && true}
                          aria-errormessage="duration-invalid"
                          {...field}
                        />
                      );
                    }}
                  />
                </FormControl>
                {packageType === "limited" && (
                  <TextField
                    {...register("bandwidth", { required: true })}
                    fullWidth
                    id="bandwidth"
                    label="Package bandwidth"
                    variant="outlined"
                    error={errors.bandwidth && true}
                    helperText={errors.bandwidth?.message}
                    sx={{
                      ml: "10px",
                      "& .MuiFormLabel-root": {
                        "&.Mui-focused": {
                          color: theme.palette.grey[900],
                        },
                      },
                    }}
                  />
                )}
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
                    name="category"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          name="category"
                          cacheOptions
                          defaultOptions
                          id="category"
                          placeholder={t("Category")}
                          noResultsText={t("no-info")}
                          isClearable={true}
                          options={categoriesOption}
                          className={`form-multi-select react-select ${
                            errors.category && " is-invalid"
                          }`}
                          classNamePrefix="select"
                          errorText={true}
                          aria-invalid={errors.category && true}
                          {...field}
                        />
                      );
                    }}
                  />
                </FormControl>
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
                    name="priority"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          controlShouldRenderValue={true}
                          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (no) => ({ label: no, value: no })
                          )}
                          id="priority"
                          name="priority"
                          placeholder={t("Priority")}
                          className={`form-multi-select react-select ${
                            errors.priority && "is-invalid"
                          }`}
                          classNamePrefix="select"
                          errorText={true}
                          aria-invalid={errors.priority && true}
                          aria-errormessage="priority-invalid"
                          {...field}
                        />
                      );
                    }}
                  />
                </FormControl>
              </FlexBetween>
            </Box>

            <Box
              sx={{
                p: "20px",
              }}
            >
              <Typography variant="body1" sx={{ pb: "10px", pl: "-10px" }}>
                Speed INfo
              </Typography>
              {packageType === "limited" ? (
                <FlexBetween>
                  <TextField
                    {...register("dailyVolume", { required: true })}
                    fullWidth
                    id="dailyVolume"
                    label="Speed after daily volume"
                    variant="outlined"
                    // error={errors.emailUsername ? true : false}
                    // helperText={errors.emailUsername?.message}
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
                    {...register("capacity", { required: true })}
                    fullWidth
                    id="capacity"
                    label="Package capacity"
                    variant="outlined"
                    error={errors.capacity && true}
                    helperText={errors.capacity?.message}
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
              ) : (
                <FlexBetween>
                  <TextField
                    {...register("daySpeed", { required: true })}
                    fullWidth
                    id="daySpeed"
                    label="Day Speed"
                    variant="outlined"
                    // error={errors.emailUsername ? true : false}
                    // helperText={errors.emailUsername?.message}
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
                    {...register("night Speed", { required: true })}
                    fullWidth
                    id="night Speed"
                    label="night  Speed"
                    variant="outlined"
                    // error={errors.emailUsername ? true : false}
                    // helperText={errors.emailUsername?.message}
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
              )}
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
                    Submit
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
      <Grid item xs={12} sm={4.5}>
        <Box
          sx={{
            p: "20px",
            backgroundColor: theme.palette.bgColor[1000],
            width: "100%",

            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
            borderRadius: "5px",
          }}
        >
          <Typography variant="body1" sx={{ pb: "10px", pl: "-10px" }}>
            Choices
          </Typography>
          <Box sx={{ mt: "10px" }}>
            <FormControl>
              <FormLabel id="type-of-bandwidth">Type of package</FormLabel>
              <RadioGroup
                row
                aria-labelledby="type-of-package"
                defaultValue="limited"
                name="package-type"
              >
                <FormControlLabel
                  value="limited"
                  control={<Radio />}
                  label="limited"
                  {...register("type")}
                />
                <FormControlLabel
                  value="unlimited"
                  control={<Radio />}
                  label="unlimited"
                  {...register("type")}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mt: "10px" }}>
            <FormControl>
              <FormLabel id="type-of-bandwidth">Type of Bandwidth</FormLabel>
              <RadioGroup
                row
                aria-labelledby="type-of-bandwidth"
                defaultValue="dedicated"
                name="bandwidth-type"
              >
                <FormControlLabel
                  value="dedicated"
                  control={<Radio />}
                  label="Dedicated"
                  {...register("bandwidth-type")}
                />
                <FormControlLabel
                  value="shared"
                  control={<Radio />}
                  label="Shared"
                  {...register("bandwidth-type")}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mt: "10px" }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Plus package"
                id="is-package-plus"
                name="is-package-plus"
                {...register("is-package-plus")}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Combined package"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Is New?"
                name="isNew"
                id="isNew"
                {...register("isNew")}
              />
            </FormGroup>
          </Box>
        </Box>

        <Box
          sx={{
            p: "20px",
            backgroundColor: theme.palette.bgColor[1000],
            width: "100%",

            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
            borderRadius: "5px",
            position: "relative",
            mt: "10px",
          }}
        >
          <Typography variant="h5" mt="10px" mb="30px">
            Other properties
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            sx={{
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
      </Grid>
    </Grid>
  );
};

export default CreatePackage;
