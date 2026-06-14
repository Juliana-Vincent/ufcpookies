export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white mt-18 mb-20 md:p-12">
      <h1 className="text-4xl font-black italic uppercase mb-12 border-l-4 border-red-600 pl-4">
        About This Project
      </h1>

      <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
        <p>
          Made for fun and to practice my web development skills, this project is a simple fanpage dedicated to the UFC. It is built with Next.js, Tailwind CSS, and Framer Motion for animations. All data are fetched from my own database in Supabase.
        </p>
        <p>
          This projet contains only my favourite (or also must know/famous) UFC fighters and fights. 
        </p>
      </div>
    </main>
  );
}