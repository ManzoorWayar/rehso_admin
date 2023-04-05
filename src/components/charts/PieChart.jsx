import { ResponsivePie } from "@nivo/pie";
import { useTheme, Box, Typography } from "@mui/material";
import { mockPieData as data } from "../../data/mockData";

const PieChart = ({ width, height }) => {
  const theme = useTheme();
  return (
    <Box height={height} width={width} position="relative">
      <ResponsivePie
        data={data}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: theme.palette.grey[800],
              },
            },
            legend: {
              text: {
                fill: theme.palette.grey[900],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.grey[800],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.grey[900],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.grey[900],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
              background: theme.palette.light.main,
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.grey[900]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.grey[900],
                },
              },
            ],
          },
        ]}
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.primary.main}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {"Total:"} ${1259843}
        </Typography>
      </Box>
    </Box>
  );
};
export default PieChart;