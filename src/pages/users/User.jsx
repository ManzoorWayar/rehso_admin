import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip, Button } from "@mui/material";
import Meta from "../../components/common/Meta";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    selectAllUsers,
} from "../../features/users/userApiSlice";
import { useSelector } from "react-redux";
import {
    ModeEditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

const User = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNoneMobile = useMediaQuery("(min-width:900px)");
    const [showModal, setShowModal] = useState(false);
    const [singleFaqId, setSinglFaqId] = useState(null);
    const { t, i18n } = useTranslation();

    const { isLoading, isSuccess, isError, error } = useGetUsersQuery();

    const users = useSelector(selectAllUsers);
    const [pageSize, setPageSize] = useState(10);

    const [
        deleteFaq,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteFaq(id);

                MySwal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const columns = useMemo(
        () => [
            {
                field: "fullName",
                valueFormatter: ({ value }) => {
                    return value.fullName;
                },

                headerName: "FullName",
                flex: 1,
                type: "string",
            },
            {
                field: "email",
                valueFormatter: ({ value }) => {
                    return value?.email;
                },

                headerName: "Email",
                flex: 1,
                type: "string",
            },
            {
                field: "createdAt",
                valueFormatter: ({ value }) => {
                    return value?.createdAt;
                },

                headerName: "CreatedAt",
                flex: 1,
                type: "string",
            },
            {
                field: "actions",
                headerName: "Actions",
                type: "actions",
                flex: 2,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={
                            <Tooltip
                                title="Edit"
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            backgroundColor: theme.palette.grey[800],
                                            color: theme.palette.grey[200],
                                        },
                                    },
                                }}
                            >
                                <ModeEditOutlined />
                            </Tooltip>
                        }
                        label="Edit"
                        onClick={() => navigate(`edit/${params.id}`)}
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip
                                title="Delete"
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            backgroundColor: theme.palette.grey[800],
                                            color: theme.palette.grey[200],
                                        },
                                    },
                                }}
                            >
                                <DeleteOutlined
                                    sx={{
                                        color: theme.palette.error.main,
                                    }}
                                />
                            </Tooltip>
                        }
                        label="Delete"
                        onClick={() => deleteHandler(params.id)}
                    />
                ],
            },
        ],
        [theme]
    );

    return (
        <>
            <Meta title="Users | Rahanet Dashboard" />

            <Box m="15px">
                <Header title="Users" subtitle="All Users" />
                <Button onClick={() => navigate("create")}>
                    Create User
                </Button>
                <Box
                    className="scrollbar"
                    m="10px 0 0 0"
                    height="73vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.light[400],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.bgColor[1000],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: theme.palette.light[400],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${theme.palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.grey[900]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        rows={users}
                        columns={columns}
                    />
                </Box>
            </Box>
        </>
    );
};

export default User;
