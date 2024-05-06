import Chart from "react-apexcharts";

const TotalListingChart = () => {
  const options = {
    colors: ["#4987BD", "#318174"],
    legend: {
      show: false,
    },
    toolbar: {
      show: false,
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: true,
      },
      style: {
        fontSize: "12px",
        color: "#0000",
        fontFamily: undefined,
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  } as ApexCharts.ApexOptions;
  const series = [
    {
      name: "Listing",
      data: [1, 4, 5, 0, 2, 1],
    },
  ];

  return (
    <div className="">
      <div className="">
        {typeof window !== "undefined" && (
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="140px"
          />
        )}
      </div>
    </div>
  );
};

export default TotalListingChart;
