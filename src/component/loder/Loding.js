import React, { useState, useEffect } from "react";
import { Loader } from "./Loder.js";

export const Lodings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // jaise hi page load ho 2 second loader dikhana
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Yaha aapka actual homepage ka content */}
          {/* <h1 style={{ textAlign: "center" }}>Welcome to My Website 🎉</h1> */}

        </div>
      )}
    </>
  );
};

