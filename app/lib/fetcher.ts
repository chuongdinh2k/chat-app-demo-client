import axios from "axios";
import { axiosClient } from "../api/config/axiosClient";

const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

export default fetcher;
