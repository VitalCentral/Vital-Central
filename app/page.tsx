"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Music,
  ClipboardList,
  UserPlus,
  HeartHandshake,
  Search,
  Bell,
  Menu,
  X,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  CircleDollarSign,
  Globe
} from "lucide-react";

type Module =
  | "dashboard"
  | "people"
  | "schedule"
  | "worship"
  | "services"
  | "guests"
  | "giving";

const translations = {
  es: {
    dashboard: "Dashboard",
    people: "Personas",
    schedule: "Programación",
    worship: "Worship",
    services: "Servicios",
    guests: "Visitantes",
    giving: "Generosidad",
    welcome: "Bienvenido a Vital Central",
    subtitle: "Un solo lugar. Un solo equipo. Una misma misión.",
    overview: "Resumen de la iglesia",
    volunteers: "Voluntarios",
    upcoming: "Próximo servicio",
    confirmations: "Confirmaciones",
    visitors: "Visitantes nuevos",
    givingTotal: "Generosidad registrada",
    quickActions: "Acciones rápidas",
    addPerson: "Agregar persona",
    planService: "Planificar servicio",
    scheduleVolunteer: "Programar voluntario",
    recentActivity: "Actividad reciente",
    teamStatus: "Estado de equipos",
    viewAll: "Ver todos",
    search: "Buscar...",
    admin: "Administrador",
    sunday: "Domingo",
    serviceTime: "1:00 PM",
    location: "Iglesia Vital",
    peopleTitle: "Directorio de personas",
    peopleDescription: "Administra la información y participación de tu comunidad.",
    scheduleTitle: "Programación de voluntarios",
    scheduleDescription: "Organiza equipos y asignaciones para cada servicio.",
    worshipTitle: "Biblioteca de Worship",
    worshipDescription: "Organiza canciones y repertorios para cada reunión.",
    servicesTitle: "Planificación de servicios",
    servicesDescription: "Coordina cada elemento de la reunión.",
    guestsTitle: "Seguimiento de visitantes",
    guestsDescription: "Da seguimiento a las personas que visitan Iglesia Vital.",
    givingTitle: "Generosidad",
    givingDescription: "Registro y resumen de contribuciones.",
    name: "Nombre",
    team: "Equipo",
    status: "Estado",
    date: "Fecha",
    amount: "Cantidad",
    category: "Categoría",
    method: "Método",
    confirmed: "Confirmado",
    pending: "Pendiente",
    active: "Activo",
    new: "Nuevo",
    noData: "No hay registros para mostrar.",
    demo: "Datos de demostración"
  },
  en: {
    dashboard: "Dashboard",
    people: "People",
    schedule: "Scheduling",
    worship: "Worship",
    services: "Services",
    guests: "Visitors",
    giving: "Giving",
    welcome: "Welcome to Vital Central",
    subtitle: "One place. One team. One mission.",
    overview: "Church overview",
    volunteers: "Volunteers",
    upcoming: "Upcoming service",
    confirmations: "Confirmations",
    visitors: "New visitors",
    givingTotal: "Giving recorded",
    quickActions: "Quick actions",
    addPerson: "Add person",
    planService: "Plan a service",
    scheduleVolunteer: "Schedule volunteer",
    recentActivity: "Recent activity",
    teamStatus: "Team status",
    viewAll: "View all",
    search: "Search...",
    admin: "Administrator",
    sunday: "Sunday",
    serviceTime: "1:00 PM",
    location: "Iglesia Vital",
    peopleTitle: "People directory",
    peopleDescription: "Manage community information and participation.",
    scheduleTitle: "Volunteer scheduling",
    scheduleDescription: "Organize teams and assignments for each service.",
    worshipTitle: "Worship library",
    worshipDescription: "Organize songs and setlists for each gathering.",
    servicesTitle: "Service planning",
    servicesDescription: "Coordinate every element of the gathering.",
    guestsTitle: "Visitor follow-up",
    guestsDescription: "Follow up with people visiting Iglesia Vital.",
    givingTitle: "Giving",
    givingDescription: "Contribution records and summaries.",
    name: "Name",
    team: "Team",
    status: "Status",
    date: "Date",
    amount: "Amount",
    category: "Category",
    method: "Method",
    confirmed: "Confirmed",
    pending: "Pending",
    active: "Active",
    new: "New",
    noData: "No records to display.",
    demo: "Demo data"
  }
};

const people = [
  { name: "Daniel Rodríguez", team: "Worship", status: "Activo" },
  { name: "María González", team: "Vital Kids", status: "Activo" },
  { name: "Carlos Méndez", team: "Producción", status: "Activo" },
  { name: "Ana Pérez", team: "Hospitalidad", status: "Activo" },
  { name: "José Ramírez", team: "Impact", status: "Activo" }
];

const assignments = [
  { name: "María González", team: "Vital Kids", status: "Confirmado" },
  { name: "Daniel Rodríguez", team: "Worship", status: "Confirmado" },
  { name: "Carlos Méndez", team: "Producción", status: "Pendiente" },
  { name: "Ana Pérez", team: "Hospitalidad", status: "Confirmado" }
];

const songs = [
  { title: "La bondad de Dios", artist: "Bethel Music", key: "G", bpm:  tempo(72) },
  { title: "Way Maker", artist: "Sinach", key: "E", bpm: tempo(68) },
  { title: "Digno y Santo", artist: "Generación 12", key: "D", bpm: tempo(74) }
];

function tempo(value: number) {
  return value;
}

const serviceItems = [
  { time: "1:00 PM", title: "Bienvenida", team: "Hospitalidad" },
  { time: "1:05 PM", title: "Alabanza", team: "Worship" },
  { time: "1:30 PM", title: "Anuncios", team: "Producción" },
  { time: "1:35 PM", title: "Mensaje", team: "Pastoral" },
  { time: "2:20 PM", title: "Oración final", team: "Oración" }
];

const contributions = [
  { name: "Contribución anónima", amount: "$100.00", method: "Efectivo", fund: "General" },
  { name: "Registro de ejemplo", amount: "$250.00", method: "Zelle", fund: "General" },
  { name: "Registro de ejemplo", amount: "$75.00", method: "Stripe", fund: "Misiones" }
];

const guests = [
  { name: "Familia de ejemplo", date: "Nov 1, 2026", status: "Seguimiento pendiente" },
  { name: "Visitante de ejemplo", date: "Oct 25, 2026", status: "Contactado" }
];

const navigation = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "people", icon: Users },
  { id: "schedule", icon: CalendarDays },
  { id: "worship", icon: Music },
  { id: "services", icon: ClipboardList },
  { id: "guests", icon: UserPlus },
  { id: "giving", icon: HeartHandshake }
] as const;

export default function Home() {
  const [module, setModule] = useState<Module>("dashboard");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const t = translations[language];

  const titles: Record<Module, string> = {
    dashboard: t.dashboard,
    people: t.peopleTitle,
    schedule: t.scheduleTitle,
    worship: t.worshipTitle,
    services: t.servicesTitle,
    guests: t.guestsTitle,
    giving: t.givingTitle
  };

  const descriptions: Record<Module, string> = {
    dashboard: t.subtitle,
    people: t.peopleDescription,
    schedule: t.scheduleDescription,
    worship: t.worshipDescription,
    services: t.servicesDescription,
    guests: t.guestsDescription,
    giving: t.givingDescription
  };

  function changeModule(id: Module) {
    setModule(id);
    setSidebarOpen(false);
    setSearchTerm("");
  }

  function renderTable(
    headers: string[],
    rows: string[][]
  ) {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cellIndex === row.length - 1 ? (
                      <span className={`status ${cell.toLowerCase().includes("pend") ? "pending" : "active-status"}`}>
                        {cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderContent() {
    if (module === "dashboard") {
      return (
        <>
          <div className="stats-grid">
            <StatCard icon={<Users />} label={t.volunteers} value="48" note="+4 este mes" />
            <StatCard icon={<CheckCircle2 />} label={t.confirmations} value="32 / 38" note="84% confirmados" />
            <StatCard icon={<UserPlus />} label={t.visitors} value="12" note="Últimos 30 días" />
            <StatCard icon={<CircleDollarSign />} label={t.givingTotal} value="$2,450" note="Este mes" />
          </div>

          <div className="dashboard-grid">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h2>{t.upcoming}</h2>
                  <p>{t.sunday}, Nov 8, 2026 · {t.serviceTime}</p>
                </div>
                <span className="tag">Próximo</span>
              </div>
              <div className="service-card">
                <div className="service-date">
                  <span>NOV</span>
                  <strong>08</strong>
                </div>
                <div>
                  <h3>Servicio dominical</h3>
                  <p><Clock size={14} /> 1:00 PM · {t.location}</p>
                </div>
              </div>
              <button className="text-button" onClick={() => changeModule("services")}>
                Ver planificación <ChevronRight size={16} />
              </button>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h2>{t.teamStatus}</h2>
                  <p>Preparación para el domingo</p>
                </div>
                <span className="tag">7 equipos</span>
              </div>
              {["Vital Kids", "Producción", "Impact", "Hospitalidad", "Worship", "Discipulado", "Seguridad", "Oración"].map((team, index) => (
                <div className="team-row" key={team}>
                  <span>{team}</span>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${[90, 75, 80, 100, 85, 60, 70, 95][index]}%` }} />
                  </div>
                  <small>{[90, 75, 80, 100, 85, 60, 70, 95][index]}%</small>
                </div>
              ))}
            </section>
          </div>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>{t.quickActions}</h2>
                <p>Accede rápidamente a las herramientas principales</p>
              </div>
            </div>
            <div className="quick-actions">
              <QuickAction icon={<Users />} label={t.addPerson} onClick={() => changeModule("people")} />
              <QuickAction icon={<ClipboardList />} label={t.planService} onClick={() => changeModule("services")} />
              <QuickAction icon={<CalendarDays />} label={t.scheduleVolunteer} onClick={() => changeModule("schedule")} />
              <QuickAction icon={<Music />} label="Agregar canción" onClick={() => changeModule("worship")} />
            </div>
          </section>
        </>
      );
    }

    if (module === "people") {
      const filtered = people.filter((person) =>
        `${person.name} ${person.team}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <section className="panel">
          <div className="panel-heading">
            <div><h2>{t.people}</h2><p>{people.length} registros de ejemplo</p></div>
            <button className="primary-button" onClick={() => alert("El formulario para agregar personas se conectará en la siguiente etapa.")}>
              <Plus size={16} /> {t.addPerson}
            </button>
          </div>
          {renderTable(
            [t.name, t.team, t.status],
            filtered.map((p) => [p.name, p.team, p.status])
          )}
        </section>
      );
    }

    if (module === "schedule") {
      return (
        <section className="panel">
          <div className="panel-heading">
            <div><h2>Domingo, Nov 8</h2><p>Asignaciones de voluntarios · 1:00 PM</p></div>
            <button className="primary-button" onClick={() => alert("La creación de asignaciones estará disponible al conectar la base de datos.")}>
              <Plus size={16} /> Nueva asignación
            </button>
          </div>
          {renderTable(
            [t.name, t.team, t.status],
            assignments.map((a) => [a.name, a.team, a.status])
          )}
        </section>
      );
    }

    if (module === "worship") {
      return (
        <section className="panel">
          <div className="panel-heading">
            <div><h2>Biblioteca de canciones</h2><p>Repertorio de ejemplo</p></div>
            <button className="primary-button" onClick={() => alert("El formulario para canciones se conectará en la siguiente etapa.")}>
              <Plus size={16} /> Agregar canción
            </button>
          </div>
          {renderTable(
            ["Canción", "Artista", "Tono", "BPM"],
            songs.map((s) => [s.title, s.artist, s.key, String(s.bpm)])
          )}
        </section>
      );
    }

    if (module === "services") {
      return (
        <section className="panel">
          <div className="panel-heading">
            <div><h2>Servicio dominical</h2><p>Domingo, Nov 8, 2026 · 1:00 PM</p></div>
            <button className="primary-button" onClick={() => alert("La edición del orden de servicio se habilitará con la base de datos.")}>
              <Plus size={16} /> Agregar elemento
            </button>
          </div>
          <div className="timeline">
            {serviceItems.map((item, index) => (
              <div className="timeline-item" key={item.title}>
                <div className="timeline-time">{item.time}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <strong>{item.title}</strong>
                  <span>{item.team}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (module === "guests") {
      return (
        <section className="panel">
          <div className="panel-heading">
            <div><h2>{t.guests}</h2><p>Seguimiento y próximos pasos</p></div>
            <button className="primary-button" onClick={() => alert("El formulario de visitantes se habilitará al conectar la base de datos.")}>
              <Plus size={16} /> Registrar visitante
            </button>
          </div>
          {renderTable(
            [t.name, t.date, t.status],
            guests.map((g) => [g.name, g.date, g.status])
          )}
        </section>
      );
    }

    return (
      <section className="panel">
        <div className="panel-heading">
          <div><h2>{t.giving}</h2><p>Registros de contribuciones de demostración</p></div>
          <button className="primary-button" onClick={() => alert("El registro de contribuciones se habilitará con permisos financieros y base de datos.")}>
            <Plus size={16} /> Registrar contribución
          </button>
        </div>
        <div className="giving-summary">
          <span>Total de ejemplo registrado</span>
          <strong>$425.00</strong>
          <small>Estos valores no representan datos financieros reales.</small>
        </div>
        {renderTable(
          [t.name, t.amount, t.method, t.category],
          contributions.map((c) => [c.name, c.amount, c.method, c.fund])
        )}
        <p className="privacy-note">
          El módulo financiero deberá tener acceso restringido a usuarios autorizados.
          Esta versión no procesa pagos ni almacena información bancaria.
        </p>
      </section>
    );
  }

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-backdrop" aria-label="Cerrar menú" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">V</div>
          <div>
            <strong>VITAL CENTRAL</strong>
            <span>IGLESIA VITAL</span>
          </div>
          <button className="close-menu" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú"><X /></button>
        </div>

        <div className="church-label">GESTIÓN DE IGLESIA</div>
        <nav>
          {navigation.map(({ id, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${module === id ? "nav-active" : ""}`}
              onClick={() => changeModule(id)}
            >
              <Icon size={19} />
              <span>{t[id]}</span>
              {module === id && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="mission-card">
            <span>HAY UN LUGAR PARA TI</span>
            <p>Alcanzar al mundo con la verdad de Jesucristo.</p>
          </div>
          <div className="profile">
            <div className="avatar">FS</div>
            <div><strong>Frank Suero</strong><span>{t.admin}</span></div>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Menu /></button>
          <div className="breadcrumb">Vital Central <ChevronRight size={14} /> <strong>{t[module]}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={t.search}
              />
            </label>
            <button className="icon-button" aria-label="Notificaciones" onClick={() => alert("Las notificaciones se activarán en una próxima etapa.")}>
              <Bell size={19} />
              <i />
            </button>
            <button className="language-button" onClick={() => setLanguage(language === "es" ? "en" : "es")}>
              <Globe size={16} /> {language.toUpperCase()}
            </button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">IGLESIA VITAL · CHARLOTTE</div>
              <h1>{module === "dashboard" ? t.welcome : titles[module]}</h1>
              <p>{descriptions[module]}</p>
            </div>
            <div className="heading-date"><CalendarDays size={16} /> Noviembre 2026</div>
          </div>

          {renderContent()}

          <footer>
            <span>VITAL CENTRAL</span>
            <span>Hay un lugar para ti. · {t.demo}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  note
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="quick-action" onClick={onClick}>
      <span>{icon}</span>
      <strong>{label}</strong>
      <ChevronRight size={16} />
    </button>
  );
}