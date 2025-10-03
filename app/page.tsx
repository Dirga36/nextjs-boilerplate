"use client";

export default function Home() {
  const login = () => {
	window.location.href = "/api/login";
  };

  return (
	<main>
	  <h1>ORCID Login Demo</h1>
	  <button onClick={login}>Login with ORCID</button>
	</main>
  );
}