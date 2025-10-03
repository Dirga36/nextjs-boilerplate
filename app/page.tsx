"use client";

type EmploymentSummary = {
  "department-name": string;
  "role-title": string;
  organization: {
    name: string;
    address: {
      city: string;
      region: string;
      country: string;
    };
  };
  "start-date": {
    year: { value: string };
    month: { value: string };
    day: null | { value: string };
  };
  "end-date": null | object;
};

type OrcidData = {
  "orcid-identifier": {
    uri: string;
    path: string;
    host: string;
  };
  preferences: {
    locale: string;
  };
  history: {
    "creation-method": string;
    "completion-date": null | string;
    "submission-date": { value: number };
    "last-modified-date": { value: number };
    claimed: boolean;
    "source": null | string;
    "deactivation-date": null | string;
    "verified-email": boolean;
    "verified-primary-email": boolean;
  };
  person: {
    name: {
      "given-names": { value: string };
      "family-name": { value: string };
      "credit-name": null | string;
      "visibility": string;
    };
  };
  "activities-summary": {
    employments: {
      "affiliation-group": Array<{
        summaries: Array<{
          "employment-summary": EmploymentSummary;
        }>;
      }>;
    };
  };
};

const data: OrcidData = {
  // ... paste your JSON data here ...
  "orcid-identifier": {
    "uri": "https://orcid.org/0009-0004-8181-9700",
    "path": "0009-0004-8181-9700",
    "host": "orcid.org"
  },
  "preferences": {
    "locale": "en"
  },
  "history": {
    "creation-method": "DIRECT",
    "completion-date": null,
    "submission-date": {
      "value": 1754898826433
    },
    "last-modified-date": {
      "value": 1759476859068
    },
    "claimed": true,
    "source": null,
    "deactivation-date": null,
    "verified-email": true,
    "verified-primary-email": true
  },
  "person": {
    "name": {
      "given-names": {
        "value": "meilina"
      },
      "family-name": {
        "value": "eka"
      },
      "credit-name": null,
      "visibility": "public"
    }
  },
  "activities-summary": {
    "employments": {
      "affiliation-group": [
        {
          "summaries": [
            {
              "employment-summary": {
                "department-name": "college",
                "role-title": "SEO analyst",
                "organization": {
                  "name": "Telkom University",
                  "address": {
                    "city": "Bandung",
                    "region": "West Java",
                    "country": "ID"
                  }
                },
                "start-date": {
                  "year": {
                    "value": "2017"
                  },
                  "month": {
                    "value": "08"
                  },
                  "day": null
                },
                "end-date": null
              }
            }
          ]
        }
      ]
    }
  }
};

function formatDate(timestamp?: number) {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

export default function Dashboard() {
  const employment: EmploymentSummary | undefined =
    data["activities-summary"].employments["affiliation-group"][0]?.summaries[0]
      ?.["employment-summary"];
  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>ORCID Dashboard</h1>
      <br />
      <section>
        <h2>Profile</h2>
        <p>
          <strong>Name:</strong>{" "}
          {data.person.name["given-names"].value} {data.person.name["family-name"].value}
        </p>
        <p>
          <strong>ORCID:</strong>{" "}
          <a href={data["orcid-identifier"].uri} target="_blank" rel="noopener noreferrer">
            {data["orcid-identifier"].path}
          </a>
        </p>
        <p>
          <strong>Locale:</strong> {data.preferences.locale}
        </p>
        <p>
          <strong>Claimed:</strong> {data.history.claimed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Verified Email:</strong> {data.history["verified-email"] ? "Yes" : "No"}
        </p>
        <p>
          <strong>Submission Date:</strong> {formatDate(data.history["submission-date"].value)}
        </p>
        <p>
          <strong>Last Modified:</strong> {formatDate(data.history["last-modified-date"].value)}
        </p>
      </section>
      <section>
        <br />
        <h2>Employment</h2>
        {employment ? (
          <div>
            <p>
              <strong>Role:</strong> {employment["role-title"]}
            </p>
            <p>
              <strong>Department:</strong> {employment["department-name"]}
            </p>
            <p>
              <strong>Organization:</strong> {employment.organization.name}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {employment.organization.address.city}, {employment.organization.address.region},{" "}
              {employment.organization.address.country}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {employment["start-date"].year.value}-{employment["start-date"].month.value}
            </p>
          </div>
        ) : (
          <p>No employment data available.</p>
        )}
      </section>
    </main>
  );
}