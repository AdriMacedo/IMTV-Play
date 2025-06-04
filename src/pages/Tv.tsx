import { useEffect, useState } from "react";
import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
} from "../services/api";
import type { TV } from "../types/interfaces";
import TVSection from "../components/TV/TVSection";

function Tv() {
  const [popularTv, setPopularTv] = useState<TV[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<TV[]>([]);
  const [onTheAirTv, setOnTheAirTv] = useState<TV[]>([]);
  const [airingToday, setAiringToday] = useState<TV[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [loadingOnTheAir, setLoadingOnTheAir] = useState(true);
  const [loadingAiringToday, setLoadingAiringToday] = useState(true);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const popular = await getPopularTV();
        const topRated = await getTopRatedTV();
        const onTheAirTv = await getOnTheAirTV();
        const airingToday = await getAiringTodayTV();

        setPopularTv(popular.results);
        setTopRatedTv(topRated.results);
        setOnTheAirTv(onTheAirTv.results);
        setAiringToday(airingToday.results);
      } catch (error) {
        console.log("Erro ao carregar series:", error);
      } finally {
        setLoadingPopular(false);
        setLoadingTopRated(false);
        setLoadingOnTheAir(false);
        setLoadingAiringToday(false);
      }
    };
    fetchTv();
  }, []);

  return (
    <div className="main-content">
      <TVSection
        title={"POPULAR"}
        tv={popularTv}
        className={"grid"}
        loading={loadingPopular}
      />
      <TVSection
        title={"TOP RATED"}
        tv={topRatedTv}
        className={"scroll"}
        loading={loadingTopRated}
      />
      <TVSection
        title={"ON THE AIR"}
        tv={onTheAirTv}
        className={"scroll"}
        loading={loadingOnTheAir}
      />
      <TVSection
        title={"AIRING TODAY"}
        tv={airingToday}
        className={"scroll"}
        loading={loadingAiringToday}
      />
    </div>
  );
}

export default Tv;
