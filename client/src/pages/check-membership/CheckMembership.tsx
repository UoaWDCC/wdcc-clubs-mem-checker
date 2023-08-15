import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Page } from "../create-checker-page/CreateCheckerPage";
import { useSearchParams } from "react-router-dom";

export default function CheckMembership() {

  const [page, setPage] = useState<Page>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const webLink = searchParams.get('webLink');

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/pages/info/${webLink}`)
    };
    fetchData();
  });

  const checkMembership = async () => {
    axios.get("/");
  }

  return <>
    {
      page ? 
        <ClubCheckerPage title={page.title!} backgroundColor={page.backgroundColor}/>
       : 
        <></>
    }
  </>
  

}