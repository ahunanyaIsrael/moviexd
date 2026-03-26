import React, { Suspense } from "react";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import { lazy } from "react";
const Recommendations = lazy(() => import("../components/Recommendations"));
const Series = lazy(() => import("../components/Series"));

const Home = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<Loader />}>
        <Recommendations />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Series />
      </Suspense>
    </div>
  );
};

export default Home;
