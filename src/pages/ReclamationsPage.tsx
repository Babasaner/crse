import { useState, type FormEvent } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  HelpCircle,
  Send,
  Building,
  User,
  Zap,
  Flame,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { PageBanner } from '../components/shared/PageBanner'
import { Button } from '../components/ui/button'

export function ReclamationsPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    userType: 'particulier',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dakar',
    sector: 'electricite',
    operator: 'senelec',
    contractNumber: '',
    meterNumber: '',
    subject: '',
    description: '',
    priorClaimDone: 'oui',
    priorClaimReference: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const generatedId = `CRSE-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setTicketId(generatedId)
    setSubmitted(true)
  }

  return (
    <>
      <PageBanner
        eyebrow="Protection des Usagers"
        title="Faire une Réclamation"
        description="La CRSE intervient pour protéger les droits des consommateurs d’électricité, de gaz et d’hydrocarbures au Sénégal en cas de litige non résolu avec leur opérateur."
      />

      <main className="mx-auto w-full max-w-[1200px] px-6 py-14">
        {/* Rappel des 3 étapes préalables */}
        <div className="mb-14 rounded-2xl bg-gradient-to-r from-blue-900 to-[#1b3e80] p-8 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4 text-shakespeare">
            <ShieldCheck size={26} />
            <span className="text-[13px] font-bold tracking-widest uppercase">
              Procédure de saisine de la CRSE
            </span>
          </div>
          <h2 className="text-[24px] font-bold mb-6">
            Avant de déposer une réclamation auprès de la Commission :
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-shakespeare text-[14px] font-bold text-white mb-3">
                1
              </span>
              <h3 className="text-[16px] font-bold mb-1.5">Saisir d'abord l'opérateur</h3>
              <p className="text-[13px] text-white/80 leading-relaxed">
                Vous devez obligatoirement avoir déposé une réclamation préalable auprès de votre fournisseur (Senelec, concessionnaire rural, etc.).
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-shakespeare text-[14px] font-bold text-white mb-3">
                2
              </span>
              <h3 className="text-[16px] font-bold mb-1.5">Délai d'attente de 30 jours</h3>
              <p className="text-[13px] text-white/80 leading-relaxed">
                Si l'opérateur ne vous a pas répondu dans un délai de 30 jours, ou si la réponse reçue ne vous satisfait pas, la CRSE est compétente.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-shakespeare text-[14px] font-bold text-white mb-3">
                3
              </span>
              <h3 className="text-[16px] font-bold mb-1.5">Instruction et décision</h3>
              <p className="text-[13px] text-white/80 leading-relaxed">
                La CRSE instruit le dossier en toute neutralité et rend une décision contraignante ou formule une conciliation.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation après soumission */}
        {submitted ? (
          <div className="rounded-2xl border border-green-200 bg-green-50/70 p-10 text-center shadow-md animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-[26px] font-bold text-green-900">
              Votre réclamation a été enregistrée avec succès
            </h2>
            <p className="mt-2 text-[16px] text-green-800">
              Numéro de dossier : <strong className="font-mono text-[18px] bg-white px-3 py-1 rounded-md border border-green-300 ml-1">{ticketId}</strong>
            </p>
            <p className="mt-4 text-[14px] text-green-700 max-w-lg mx-auto">
              Un accusé de réception a été envoyé à <strong>{formData.email || 'votre adresse email'}</strong>. La direction de la protection des consommateurs de la CRSE examinera votre dossier sous 15 jours ouvrés.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setStep(1)
                }}
                className="rounded-full bg-green-800 text-white hover:bg-green-900"
              >
                Introduire une autre réclamation
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        ) : (
          /* Formulaire pas à pas */
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm">
            {/* Barre de progression des étapes */}
            <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-6">
              {[
                { s: 1, label: 'Identité' },
                { s: 2, label: 'Opérateur & Contrat' },
                { s: 3, label: 'Motif du litige' },
                { s: 4, label: 'Validation' },
              ].map((item, idx) => (
                <div key={item.s} className="flex items-center gap-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
                      step >= item.s
                        ? 'bg-chathams-blue text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {item.s}
                  </span>
                  <span
                    className={`text-[14px] font-medium hidden sm:inline ${
                      step >= item.s ? 'text-chathams-blue' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                  {idx < 3 && <ChevronRight size={16} className="text-slate-300 ml-2 hidden md:inline" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Étape 1 : Coordonnées */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-4">
                    Étape 1 : Informations du demandeur
                  </h3>
                  
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer border border-slate-200 rounded-lg px-4 py-2.5 has-[:checked]:border-chathams-blue has-[:checked]:bg-blue-50/40">
                      <input
                        type="radio"
                        name="userType"
                        value="particulier"
                        checked={formData.userType === 'particulier'}
                        onChange={(e) => handleChange('userType', e.target.value)}
                        className="text-chathams-blue"
                      />
                      <User size={16} />
                      <span className="text-[14px] font-medium">Particulier (Ménage)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer border border-slate-200 rounded-lg px-4 py-2.5 has-[:checked]:border-chathams-blue has-[:checked]:bg-blue-50/40">
                      <input
                        type="radio"
                        name="userType"
                        value="professionnel"
                        checked={formData.userType === 'professionnel'}
                        onChange={(e) => handleChange('userType', e.target.value)}
                        className="text-chathams-blue"
                      />
                      <Building size={16} />
                      <span className="text-[14px] font-medium">Entreprise / Professionnel</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Nom complet ou Raison sociale *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Ex. Mamadou Diop"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Numéro de téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Ex. +221 77 000 00 00"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Adresse e-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="nom@exemple.sn"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Région / Ville *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none bg-white"
                      >
                        <option value="Dakar">Dakar</option>
                        <option value="Thiès">Thiès</option>
                        <option value="Saint-Louis">Saint-Louis</option>
                        <option value="Diourbel">Diourbel</option>
                        <option value="Fatick">Fatick</option>
                        <option value="Kaolack">Kaolack</option>
                        <option value="Kaffrine">Kaffrine</option>
                        <option value="Tambacounda">Tambacounda</option>
                        <option value="Kédougou">Kédougou</option>
                        <option value="Kolda">Kolda</option>
                        <option value="Sédhiou">Sédhiou</option>
                        <option value="Ziguinchor">Ziguinchor</option>
                        <option value="Louga">Louga</option>
                        <option value="Matam">Matam</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full bg-chathams-blue px-8 text-white gap-2"
                    >
                      <span>Continuer vers l'étape 2</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Secteur & Opérateur */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-4">
                    Étape 2 : Opérateur concerné
                  </h3>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">
                      Secteur d'activité concerné *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'electricite', label: 'Électricité', icon: Zap },
                        { id: 'hydrocarbures', label: 'Hydrocarbures / Carburant', icon: Flame },
                        { id: 'gaz', label: 'Gaz naturel / Butane', icon: Flame },
                      ].map((sec) => {
                        const Icon = sec.icon
                        return (
                          <label
                            key={sec.id}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                              formData.sector === sec.id
                                ? 'border-chathams-blue bg-blue-50/50 text-chathams-blue font-bold ring-2 ring-chathams-blue/10'
                                : 'border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="sector"
                              value={sec.id}
                              checked={formData.sector === sec.id}
                              onChange={(e) => handleChange('sector', e.target.value)}
                              className="sr-only"
                            />
                            <Icon size={18} />
                            <span className="text-[14px]">{sec.label}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Nom de l'opérateur ou distributeur *
                      </label>
                      <select
                        value={formData.operator}
                        onChange={(e) => handleChange('operator', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none bg-white"
                      >
                        <option value="senelec">Senelec (Réseau national / Woyofal)</option>
                        <option value="comasel">COMASEL (Concession rurale)</option>
                        <option value="era">ERA (Électrification rurale)</option>
                        <option value="totalenergies">TotalEnergies Sénégal</option>
                        <option value="shell">Vivo Energy (Shell)</option>
                        <option value="ola">Ola Energy</option>
                        <option value="touba-oil">Touba Oil</option>
                        <option value="autre">Autre opérateur régulé</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Numéro de compteur / Référence abonné
                      </label>
                      <input
                        type="text"
                        value={formData.meterNumber}
                        onChange={(e) => handleChange('meterNumber', e.target.value)}
                        placeholder="Ex. 14 chiffres (Woyofal) ou n° police"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="rounded-full"
                    >
                      Précédent
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="rounded-full bg-chathams-blue px-8 text-white gap-2"
                    >
                      <span>Continuer vers l'étape 3</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 3 : Objet & Motif du litige */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-4">
                    Étape 3 : Objet et motif du litige
                  </h3>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Nature principale du problème *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-[15px] focus:border-chathams-blue focus:outline-none bg-white"
                      required
                    >
                      <option value="">Sélectionnez la nature du litige...</option>
                      <option value="facturation">Facturation abusive ou contestation de tranche</option>
                      <option value="compteur">Dysfonctionnement du compteur ou recharge non créditée</option>
                      <option value="coupure">Coupure abusive ou non rétablissement du service</option>
                      <option value="raccordement">Retard excessif de branchement / raccordement</option>
                      <option value="qualite">Chutes de tension et dégradation d'appareils électriques</option>
                      <option value="carburant">Qualité du carburant ou non-respect des prix à la pompe</option>
                      <option value="autre">Autre litige contractuel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Description détaillée des faits *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Expliquez précisément la situation : dates des événements, démarches déjà entreprises auprès de l'opérateur, montant contesté..."
                      className="w-full rounded-lg border border-slate-200 p-3.5 text-[15px] focus:border-chathams-blue focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center bg-slate-50">
                    <FileUp size={28} className="mx-auto text-slate-400 mb-2" />
                    <span className="block text-[14px] font-bold text-slate-700">
                      Pièces justificatives (Factures, photos compteur, reçu de plainte opérateur)
                    </span>
                    <span className="text-[12px] text-slate-500 block mt-1">
                      Formats acceptés : PDF, JPG, PNG (Max. 10 Mo au total)
                    </span>
                    <input type="file" multiple className="mt-3 text-[13px] text-slate-600" />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="rounded-full"
                    >
                      Précédent
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(4)}
                      className="rounded-full bg-chathams-blue px-8 text-white gap-2"
                    >
                      <span>Vérifier et soumettre</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 4 : Récapitulatif et soumission */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-[20px] font-bold text-chathams-blue mb-4">
                    Étape 4 : Récapitulatif avant envoi
                  </h3>

                  <div className="rounded-xl bg-slate-50 p-6 border border-slate-200 text-[14px] space-y-3">
                    <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[12px]">Plaignant :</span>
                        <strong>{formData.fullName || 'Non renseigné'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[12px]">Contact :</span>
                        <span>{formData.phone} • {formData.email}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[12px]">Opérateur :</span>
                        <strong className="capitalize">{formData.operator}</strong> ({formData.sector})
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[12px]">Compteur / Police :</span>
                        <span>{formData.meterNumber || 'Non spécifié'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[12px]">Objet du litige :</span>
                      <strong>{formData.subject || 'Autre litige'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[12px]">Détails :</span>
                      <p className="text-slate-700 italic mt-1">{formData.description || 'Aucune description fournie.'}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-[13px] text-amber-900 flex items-start gap-2.5">
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      En soumettant ce formulaire, vous certifiez sur l'honneur l'exactitude des informations fournies et autorisez la CRSE à solliciter l'opérateur concerné dans le cadre de l'instruction de votre réclamation.
                    </span>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="rounded-full"
                    >
                      Modifier mes saisies
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-full bg-chathams-blue px-10 text-white gap-2 font-bold hover:bg-chathams-blue/90"
                    >
                      <Send size={16} />
                      <span>Transmettre la réclamation à la CRSE</span>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Coordonnées d'assistance directe */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex items-start gap-4">
            <div className="rounded-full bg-chathams-blue p-3 text-white">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue">Assistance téléphonique aux usagers</h4>
              <p className="text-[13px] text-slate-600 mt-1">
                Nos juristes et conseillers vous orientent du lundi au vendredi de 08h00 à 17h00.
              </p>
              <a href="tel:+221338490459" className="text-shakespeare font-bold text-[15px] mt-2 inline-block hover:underline">
                +221 33 849 04 59
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex items-start gap-4">
            <div className="rounded-full bg-shakespeare p-3 text-white">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-chathams-blue">Consultez notre Guide Usagers</h4>
              <p className="text-[13px] text-slate-600 mt-1">
                Retrouvez vos droits contractuels, barèmes légaux et conseils pratiques pour réduire vos factures.
              </p>
              <a href="/faq" className="text-chathams-blue font-bold text-[13px] mt-2 inline-flex items-center gap-1 hover:underline">
                <span>Accéder à la Foire aux Questions (FAQ)</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
