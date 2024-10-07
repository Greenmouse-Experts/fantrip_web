import { formatAsNgnMoney } from "@/lib/utils/formatHelp";
import { FC } from "react";
import Chart from "react-apexcharts";


interface Props{
  months: string[],
  revenue: number[]
}
const TotalRevenueChart:FC<Props> = ({months, revenue}) => {
    const options = {
        colors: ["#9847fe", "#318174"],
        legend: {
          show: true,
        },
        tooltip:{
            theme: "dark",
            marker: {
                show: true,
              },
            style: {
                fontSize: '12px',
                color: '#0000',
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
                show: true,
                style: {
                    colors: '#A3A3A3',
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-label',
                },
                formatter: (val) => `${formatAsNgnMoney(val)}`
              },
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#A3A3A3',
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-label',
                },
              },
          categories: months,
        },
      } as ApexCharts.ApexOptions;
      const series = [
        {
          name: "Revenue",
          data: revenue,
        },
      ];
    
      return (
        <div className="">
          <div className="mt-6 lg:mt-8">
            {typeof window !== "undefined" && (
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="350px"
              />
            )}
          </div>
        </div>
      );
}

export default TotalRevenueChart