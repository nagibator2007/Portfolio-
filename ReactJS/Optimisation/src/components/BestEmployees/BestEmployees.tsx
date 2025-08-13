import { useState, useEffect, memo } from "react";
import { IBestEmployees } from "../../api.ts";
import "./styles.css";

interface IBestEmployeesData {
  getApi: (year: number) => Promise<IBestEmployees>;
  year: number;
}

const BestEmployeesComponent: React.FC<IBestEmployeesData> = ({ getApi, year }) => {
  const [employees, setEmployees] = useState<IBestEmployees | null>(null);

  useEffect(() => {
    getApi(year)
      .then((res) => setEmployees(res))
      .catch((error) => console.error("Error", error));
  }, [getApi, year]);

  // Мемоизируем рендеринг, если employees не изменился
  return (
    employees && (
      <div className="container">
        <h2>Best employee of the year</h2>
        <img src={employees.image} width={400} height={400} alt="" />
        <p>
          {employees.name}: {employees.position}
        </p>
      </div>
    )
  );
};

export const BestEmployees = memo(BestEmployeesComponent);