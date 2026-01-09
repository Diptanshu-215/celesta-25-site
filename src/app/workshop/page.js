import WorkshopCard from './workshop-card'
import styles from './Workshops.module.css'
import data from './workshops.json'

export default function Workshop() {
  const workshops = data["workshops"]
  return (
    <div className={`bg-muted flex flex-col min-h-svh gap-8 px-4 md:px-10 ${styles.background} text-white w-full overflow-x-hidden`}>
      <h1 className="race font-bold text-5xl md:text-7xl text-center mb-12 mt-[15vh] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 w-full uppercase">WORKSHOPS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full place-items-center">
        {workshops.map((workshop, idx) => (
          <WorkshopCard
            key={idx}
            name={workshop.name}
            img_src={workshop.img_src}
            register_link={workshop.register_link}
          />
        ))}
      </div>
    </div>
  )
}
