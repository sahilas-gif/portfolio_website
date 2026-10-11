import { GraduationCap } from "lucide-react";
export default function Education() {
  return (
    <section
      id="education"
      className="education-section shell js-reveal"
      aria-labelledby="education-title"
    >
      <div>
        <GraduationCap size={24} strokeWidth={1.2} />
        <h2 id="education-title">Foundations</h2>
        <span className="micro-label">EDUCATION & BACKGROUND</span>
      </div>
      <div>
        <h3>Master of Computer Applications</h3>
        <p>K. J. Somaiya Institute of Management</p>
        <span>Expected Jul 2027 · 7.18 CGPA, Semester 1</span>
      </div>
      <div>
        <h3>Bachelor of Management Studies</h3>
        <p>VPM’s R. Z. Shah College of Arts, Science & Commerce</p>
        <span>Jul 2023 · 7.98 CGPI</span>
      </div>
    </section>
  );
}
