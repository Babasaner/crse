import { useState, type FormEvent } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'general',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageBanner
        eyebrow="Nous Joindre"
        title="Contactez la CRSE"
        description="Vous avez une demande d’information générale, une sollicitation professionnelle ou une requête institutionnelle ? Nos services vous répondent."
      />

      <main className="mx-auto w-full max-w-[1440px] px-6 py-14 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Informations Siège & Coordonnées */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm mb-8">
              <h2 className="text-[24px] font-bold text-chathams-blue mb-6">
                Siège de la Commission
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-slate-800">Adresse géographique :</strong>
                    <address className="not-italic text-[14px] text-slate-600 leading-relaxed mt-1">
                      Bidaness Building, VDN, Mermoz<br />
                      PG2J+2GF, Rue KA 05<br />
                      BP 11701 Dakar, Sénégal
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-slate-800">Téléphone standard :</strong>
                    <a href="tel:+221338490459" className="text-[15px] font-bold text-chathams-blue hover:text-shakespeare mt-1 inline-block">
                      +221 33 849 04 59
                    </a>
                    <span className="block text-[12px] text-slate-500">Appels locaux & internationaux</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-slate-800">Courrier électronique :</strong>
                    <a href="mailto:crse@crse.sn" className="text-[15px] text-shakespeare hover:underline mt-1 inline-block">
                      crse@crse.sn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-chathams-blue shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <strong className="block text-[15px] text-slate-800">Horaires d'ouverture au public :</strong>
                    <p className="text-[14px] text-slate-600 mt-1">
                      Du Lundi au Vendredi : <strong>08h00 – 17h00</strong><br />
                      Fermé les samedis, dimanches et jours fériés légaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note importante réclamations */}
            <div className="rounded-2xl bg-amber-50/80 p-6 border border-amber-200">
              <div className="flex items-start gap-3">
                <HelpCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="text-[15px] font-bold text-amber-900">
                    Vous souhaitez déposer une réclamation contre un fournisseur ?
                  </h3>
                  <p className="text-[13px] text-amber-800 mt-1 leading-relaxed">
                    Veuillez ne pas utiliser ce formulaire général de contact. Utilisez notre portail dédié pour obtenir un numéro de suivi et un traitement prioritaire.
                  </p>
                  <Button asChild size="sm" className="mt-3 rounded-full bg-amber-800 text-white hover:bg-amber-900">
                    <a href="/reclamations">Aller au formulaire de réclamation</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm">
            <h2 className="text-[24px] font-bold text-chathams-blue mb-2">
              Envoyez-nous un message
            </h2>
            <p className="text-[14px] text-slate-500 mb-6">
              Remplissez le formulaire ci-dessous et nos équipes vous répondront dans les plus brefs délais.
            </p>

            {sent ? (
              <div className="rounded-xl bg-green-50 p-8 text-center border border-green-200 animate-fade-in">
                <CheckCircle2 size={44} className="text-green-600 mx-auto mb-3" />
                <h3 className="text-[20px] font-bold text-green-900">Message envoyé avec succès !</h3>
                <p className="text-[14px] text-green-800 mt-2">
                  Merci de nous avoir contactés. Votre demande a bien été transmise au service concerné.
                </p>
                <Button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full bg-green-700 text-white"
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="M. / Mme..."
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@exemple.sn"
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 ..."
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Service destinataire *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none bg-white"
                  >
                    <option value="general">Standard & Renseignements généraux</option>
                    <option value="juridique">Direction des Affaires Juridiques</option>
                    <option value="electricite">Direction Technique Électricité</option>
                    <option value="hydrocarbures">Direction des Hydrocarbures & du Gaz</option>
                    <option value="communication">Presse & Relations Publiques</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Objet de votre demande *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Sujet de votre message..."
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détaillez votre message..."
                    className="w-full rounded-lg border border-slate-200 p-3 text-[15px] focus:border-chathams-blue focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-chathams-blue py-3 font-semibold text-white hover:bg-chathams-blue/90 gap-2"
                >
                  <Send size={16} />
                  <span>Envoyer mon message</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
