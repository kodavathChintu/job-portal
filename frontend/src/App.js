import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    jobid: "",
    jobrole: "",
    company: "",
    experience: "",
    location: "", 
    salary: "",
  });

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/user")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user ",
        form
      );
      setData([...data, res.data]); // update UI instantly
      alert("Job Created!");
    } catch (err) {
      console.log(err);
    }
  };

  // Filter jobs
  const filteredJobs = data.filter((job) =>
    job.jobrole.toLowerCase().includes(search.toLowerCase())
  );

  // UI States
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Portal</h1>

      {/* creating job by companies */}
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="jobid" placeholder="Job ID" onChange={handleChange} />
        <input name="jobrole" placeholder="Role" onChange={handleChange} />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="experience" placeholder="Experience" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="salary" placeholder="Salary" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>

      <hr />

      {/* search jobs by candidates */}
      <input
        type="text"
        placeholder="Search job role..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* JOB LIST */}
      <h2>Available Jobs</h2>
      <ul>
        {filteredJobs.map((job, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{job.jobrole}</strong> <br />
            Company: {job.company} <br />
            Location: {job.location} <br />
            Salary: {job.salary} <br />

            <button onClick={() => alert("Applied Successfully!")}>
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;