import React from "react";
import CryptoTable from "./components/CryptoTable/CryptoTable";

function Home(){
  return (
    <div className="p-5">
      <p className="text-center mb-5">
        Cryptocurrency prices by <span className="font-bold">crypto app</span>
      </p>
      <CryptoTable />
    </div>
  );
}

export default Home;