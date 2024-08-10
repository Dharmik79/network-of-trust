"use client";

import { useEffect } from "react";
import { CSSProperties, FC } from "react";
import { SampleGraph } from "../components/SampleGraph";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import type { NextPage } from "next";

const Fa2: FC = () => {
  const { start, kill } = useWorkerLayoutForceAtlas2({ settings: { slowDown: 10 } });

  useEffect(() => {
    // start FA2
    start();

    // Kill FA2 on unmount
    return () => {
      kill();
    };
  }, [start, kill]);

  return null;
};

const Demo: FC<{ style: CSSProperties }> = ({ style }) => {
  return (
    <SigmaContainer style={style} settings={{ allowInvalidContainer: true }}>
      <SampleGraph />
      <Fa2 />
    </SigmaContainer>
  );
};
const Home: NextPage = () => {
  return (
    <>
      <Demo style={{ height: 300 }} />
    </>
  );
};

export default Home;
