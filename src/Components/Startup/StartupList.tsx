import { ReactElement, useEffect, useState } from "react";
import { Startup } from "../../Types/Startup";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import Pagination from "@mui/material/Pagination";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);

  const [returnedStartups, setReturnedStartups] = useState<Startup[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const startups = await StartupHttpService.getStartups();
        setStartups(startups);
        setReturnedStartups(startups.slice(0, 20));
      } catch (e) {
        throw new Error("Failed to get startups");
      }
    };

    fetchStartups();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const slicedStartups = startups.slice((page - 1) * 20, page * 20);
    setPage(page);
    setReturnedStartups(slicedStartups);
  };

  console.log("returned Startups", returnedStartups);

  return (
    <div>
      {returnedStartups.map((startup: Startup) => (
        <div key={startup.id}>
          <div>{startup.id}</div>
          <div>{startup.name}</div>
          <div>
            <div>Founded: {startup.dateFounded.getFullYear()}</div>
            <div>{startup.employees} Employees</div>
            <div>{startup.totalFunding} $</div>
            <div>Series {startup.currentInvestmentStage}</div>
          </div>
          <div>{startup.shortDescription}</div>
        </div>
      ))}
      <Pagination
        count={startups.length / 20}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
