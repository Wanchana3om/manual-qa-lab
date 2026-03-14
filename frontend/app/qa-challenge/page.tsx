import { getQaChallenges } from '@/lib/api'

export default async function QaChallengePage() {
  const data = await getQaChallenges()

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h1>QA Challenge</h1>
        <p className="muted">
          ใช้หน้านี้เป็น requirement เบื้องต้นสำหรับเขียน test case และ exploratory testing
        </p>
      </div>

      <div className="card">
        <h2>Requirement Summary</h2>
        <ul>
          {data.requirements.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Suggested Test Scenarios</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Scenario</th>
              <th>Expected Result</th>
            </tr>
          </thead>
          <tbody>
            {data.testScenarios.map((item: { id: string; title: string; expected: string }) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Bug Hunt Mission</h2>
        <ol>
          {data.bugHints.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
