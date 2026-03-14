export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="card">
        <span className="badge">Manual QA Practice</span>
        <h1>Mini Shop QA Lab</h1>
        <p>
          เว็บตัวอย่างสำหรับฝึก manual testing แบบง่าย ๆ โดย backend ใช้ mock data in-memory
          ไม่มี database จริง
        </p>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <h3>1. Functional Testing</h3>
          <p>ทดสอบ login, search, sort, cart, coupon, checkout</p>
        </div>
        <div className="card">
          <h3>2. Exploratory Testing</h3>
          <p>ลองใส่ input แปลก ๆ หรือ flow ที่ผู้ใช้จริงอาจทำ</p>
        </div>
        <div className="card">
          <h3>3. Test Case Design</h3>
          <p>ใช้ requirement จากหน้า QA Challenge เพื่อเขียน test case</p>
        </div>
      </section>

      <section className="card">
        <h2>บัญชีทดสอบ</h2>
        <div className="code">
          username: tester
          <br />
          password: 1234
        </div>
      </section>
    </div>
  )
}
