import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      navigate(`/schools?q=${encodeURIComponent(q)}`, { replace: true });
    } else {
      navigate("/schools", { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
}
