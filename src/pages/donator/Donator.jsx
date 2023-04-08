import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import Meta from "../../components/common/Meta";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    selectAllDonators,
    useGetDonatorsQuery,
    useChangeDonatorstatusMutation,
} from "../../features/donator/donatorApiSlice";
import { CheckBoxOutlined, Pending } from "@mui/icons-material";

const Donator = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNoneMobile = useMediaQuery("(min-width:900px)");

    const { isLoading, isSuccess, isError, error } = useGetDonatorsQuery();

    const [changeStatus] = useChangeDonatorstatusMutation();

    const changeContactStatus = async (status, id) => {
        await changeStatus({ id, status });
    };

    const donators = useSelector(selectAllDonators);
    const [pageSize, setPageSize] = useState(11);

    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "#",
                flex: 0.2,
                type: "string",
                renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
            },
            {
                field: "firstName",
                valueFormatter: (value) => {
                    return value.firstName;
                },

                headerName: "FirstName",
                flex: 1,
                type: "string",
            },
            {
                field: "lastName",
                valueFormatter: (value) => {
                    return value.lastName;
                },

                headerName: "LastName",
                flex: 1,
                type: "string",
            },
            {
                field: "email",
                headerName: "Email",
                valueFormatter: (value) => {
                    return value?.email;
                },
                flex: 2,
                type: "string",
            },
            {
                field: "phone",
                headerName: "Phone Number",
                valueFormatter: (value) => {
                    return value?.phone;
                },
                flex: 1.5,
                type: "string",
            },
            {
                field: "country",
                headerName: "Country",
                valueFormatter: (value) => {
                    return value?.country;
                },
                flex: 1,
                type: "string",
            },
            {
                field: "city",
                headerName: "Province",
                valueFormatter: (value) => {
                    return value?.city;
                },
                flex: 1,
                type: "string",
            },
            {
                field: "age",
                headerName: "Age",
                valueFormatter: ({ value }) => {
                    return value?.age;
                },
                flex: 0.5,
                type: "string",
            },
            {
                field: "gender",
                headerName: "Gender",
                valueFormatter: ({ value }) => {
                    return value?.gender;
                },
                flex: 0.7,
                type: "string",
            },
            {
                field: "status",
                headerName: "Status",
                valueFormatter: (value) => {
                    return value?.status;
                },
                flex: 0.7,
                type: "string",
            },
            {
                field: "actions",
                headerName: "Change Stauts",
                type: "actions",
                flex: 2,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={
                            <Tooltip
                                title="Pending"
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            backgroundColor: theme.palette.grey[800],
                                            color: theme.palette.grey[200],
                                        },
                                    },
                                }}
                            >
                                <Pending
                                    sx={{
                                        color: theme.palette.warning.main,
                                    }}
                                />
                            </Tooltip>
                        }
                        label="Pending"
                        onClick={() => changeContactStatus("pending", params.id)}
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip
                                title="Approved"
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            backgroundColor: theme.palette.grey[800],
                                            color: theme.palette.grey[200],
                                        },
                                    },
                                }}
                            >
                                <CheckBoxOutlined
                                    sx={{
                                        color: theme.palette.success.main,
                                    }}
                                />
                            </Tooltip>
                        }
                        label="Approved"
                        onClick={() => changeContactStatus("approved", params.id)}
                    />
                ],
            },
        ],
        [theme]
    );

    if (isLoading) {
        return <h3>loading</h3>
    }

    return (
        <>
            <Meta title="Donator | REHSO Dashboard" />

            <Box m="15px">
                <Header title="Donator's List" />
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
                        rowsPerPageOptions={[11, 21]}
                        pagination
                        rows={donators}
                        columns={columns}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Donator;
