import {
  useTheme,
  Container,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import Header from "../components/Header";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import StatBox from "../components/StatBox";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import { mockTransactions } from "../data/mockData";
import LineChart from "../components/charts/LineChart";
import Meta from '../components/common/Meta'

const Dashboard = () => {
  const theme = useTheme();

  return (
    <>
      <Meta />

      <Container maxWidth="xl">
        <Header title="Dashboard" subtitle="Welcome Back!" />

        {/* stat box container */}
        {/* <Grid
          container
          spacing={2}
          gap={1}
          mt={2}
          alignItems="start"
          justifyContent="space-evenly"
        >
          <StatBox
            title="Total Customers"
            value={1450}
            increase="+14%"
            description="Since last month"
            icon={
              <Email sx={{ color: theme.palette.black[400], fontSize: "26px" }} />
            }
          />

          <StatBox
            title="Sales Today"
            value={4456}
            increase="+21%"
            description="Since last month"
            icon={
              <PointOfSale
                sx={{ color: theme.palette.black[400], fontSize: "26px" }}
              />
            }
          />

          <StatBox
            title="Monthly Sales"
            value={33456}
            increase="+5%"
            description="Since last month"
            icon={
              <PersonAdd
                sx={{ color: theme.palette.black[400], fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title="Yearly Sales"
            value={54635}
            increase="+43%"
            description="Since last month"
            icon={
              <Traffic
                sx={{ color: theme.palette.black[400], fontSize: "26px" }}
              />
            }
          />
        </Grid> */}

        {/* Graph and recent transaction container */}
        <Grid container mt={"2rem"} gap={3} mb={"2rem"}>
          {/* Graph grid */}
          <Grid xs={12} md={7.5}>
            <Box
              backgroundColor={theme.palette.bgColor[1000]}
              px={1}
              pb="10px"
              pt="0.5px"
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={theme.palette.grey[900]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    pb="20px"
                    color={theme.palette.primary.main}
                  >
                    $59,342.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlined
                      sx={{ fontSize: "26px", color: theme.palette.black[400] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart
                  height="250px"
                  width="98%"
                  isCustomLineColors={false}
                  isDashboard={true}
                />
              </Box>
            </Box>
          </Grid>

          {/* Recent Transaction grid */}
          {/* <Grid
            width="100%"
            xs={12}
            md={4}
            alignSelf="start"
            className="scrollbar"
          >
            <Box
              height="332px"
              backgroundColor={theme.palette.bgColor[1000]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${theme.palette.bgColor[700]}`}
                p="15px"
              >
                <Typography
                  color={theme.palette.grey[900]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Transactions
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${theme.palette.bgColor[700]}`}
                  p="15px"
                >
                  <Box>
                    <Typography color={theme.palette.grey[900]} variant="h5">
                      {transaction.txId}
                    </Typography>
                    <Typography color={theme.palette.grey[800]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={theme.palette.grey[800]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={theme.palette.light.main}
                    color={theme.palette.primary.main}
                    fontWeight="bold"
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
