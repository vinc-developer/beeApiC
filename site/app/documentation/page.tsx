import styles from "@/app/frelon-asiatique/page.module.css";

export default function DocumentationPage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>
                    Documentation abeille melifera
                </h1>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                        L'apiculture est l'élevage et la gestion des abeilles, principalement des abeilles mellifères, dans le but
                        de produire du miel, de la cire d'abeille, de la gelée royale, et d'autres produits dérivés
                    </p>
                </div>

                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/ruche-abeilles.jpg`}
                    alt="Frelon asiatique"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />

                <div>
                    <h3>Voici un résumé de ses principaux aspects</h3>
                    <div>
                        <ul>
                            <li>
                                <h6>Les abeilles</h6>
                                <p>Les apiculteurs élèvent principalement l'abeille européenne (Apis mellifera),
                                    bien qu'il existe d'autres espèces utilisées localement. Les abeilles jouent un rôle crucial
                                    dans la pollinisation
                                    des plantes, contribuant ainsi à la reproduction de nombreuses cultures alimentaires et
                                    plantes sauvages.</p>
                            </li>
                            <li>
                                <h6>Les colonies d'abeilles </h6>
                                <p>Les abeilles vivent en colonies organisées, avec une reine qui pond des œufs,
                                    des ouvrières qui s'occupent de la collecte de nourriture, de l'entretien de la ruche et de la
                                    protection
                                    de la colonie, ainsi que des mâles (ou faux-bourdons) dont le rôle est de féconder la
                                    reine.</p>
                            </li>
                            <li>
                                <h6>Les ruches</h6>
                                <p>Les apiculteurs fournissent des ruches artificielles où les abeilles peuvent construire leurs
                                    rayons
                                    et stocker leur miel. Ces ruches sont conçues pour être facilement inspectées et manipulées
                                    par les apiculteurs.</p>
                            </li>
                            <li>
                                <h6>La récolte du miel</h6>
                                <p>Le miel est récolté lorsque les abeilles ont stocké suffisamment de nectar dans les rayons
                                    et l'ont transformé en miel. Les apiculteurs retirent délicatement les cadres de miel des
                                    ruches, retirent la
                                    cire et extraient le miel à l'aide de centrifugeuses ou d'autres méthodes.</p>
                            </li>
                            <li>
                                <h6>La pollinisation</h6>
                                <p> En plus de produire du miel, les abeilles jouent un rôle essentiel dans la pollinisation des
                                    plantes, ce qui contribue à la production de fruits, légumes et graines dans
                                    l'agriculture.</p>
                            </li>
                            <li>
                                <h6>Les menaces pour les abeilles</h6>
                                <p>Les abeilles font face à de nombreuses menaces, notamment les parasites comme
                                    le varroa, les maladies, <a href="#">le frelon asiatique</a>, les pesticides, la perte
                                    d'habitat et le changement climatique.
                                    Ces menaces ont contribué au déclin des populations d'abeilles dans de nombreuses régions du
                                    monde.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>La vie dans une ruche</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <h3>l'abeille cycle de vie</h3>

                        <p className={styles.cardText}>
                            Tout d'abord il faut savoir qu'une collonie se compose de 3 sortes d'abeilles, la reine, les ouvrieres
                            et les faux bourdon (les males), chaque abeille a un cycle de naissance différent qui varie de 16 a
                            24J.
                        </p>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/difference-abeille.jpg`}
                            alt="Frelon asiatique qui attaque une abeille"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                        <p className={styles.cardText}>
                            Le cycle de vie d'une abeille se compose de quatre étapes principales : l'œuf, la larve, la nymphe et
                            l'abeille adulte. Une reine pond un œuf dans une cellule de la ruche. Après quelques jours, l'œuf
                            éclos et une larve émerge. Les larves sont nourries de gelée royale par les abeilles ouvrières pendant
                            environ une semaine, puis les cellules sont operculées pour permettre à la larve de se transformer en
                            nymphe. À l'intérieur de la cellule, la nymphe se métamorphose en abeille adulte, qui perce finalement
                            le couvercle de la cellule et rejoint la colonie en tant qu'abeille ouvrière, faux-bourdon ou reine.
                            Les abeilles ouvrières, qui constituent la majorité de la colonie, sont responsables de la collecte de
                            nourriture, de la construction de rayons et de l'entretien de la ruche. Les faux-bourdons, ou mâles,
                            ne participent pas activement à ces tâches, mais sont essentiels à la reproduction de la colonie.
                            Enfin, il y a la reine, qui est la seule femelle capable de pondre des œufs fécondés et qui assure la
                            pérennité de la colonie.
                        </p>

                        <span>Le saviez-vous : en une journée, une abeille ouvrière peut butiner jusqu’à 2000 fleurs !</span>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cycle.jpg`}
                            alt="Frelon asiatique qui attaque une abeille"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cycle-vie.png`}
                            alt="Frelon asiatique qui attaque une abeille"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/anatomie-de-l-abeille.jpg`}
                            alt="Frelon asiatique qui attaque une abeille"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                    </div>
                </div>

                <div className="metier-abeille">
                    <h3>Les métiers des abeilles</h3>
                    <iframe src="https://player.vimeo.com/video/136191794" width="640" height="360" frameBorder="0"
                            allowFullScreen></iframe>
                </div>
                <div className="metier-abeille">
                    <h3>La naissance des abeilles</h3>
                    <iframe width="640" height="360" src="https://www.youtube.com/embed/oglJrwyF7Ws?si=tZYxX2PXWLAGR8d9"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>

                <div>
                    <h3>La ruche dadant</h3>
                    <p>Il existe differentes sorte de ruche, nous utilisont la ruche dadant sur 10 cadres.
                        la ruche Dadant est un modèle de ruche populaire et largement utilisé dans l'apiculture en raison de sa
                        conception pratique,
                        de sa capacité à favoriser le bien-être des abeilles et de sa flexibilité dans la gestion des colonies.
                        Dans une ruche, on trouve différents types de cadres, notamment des cadres à couvain, des cadres à miel et
                        des
                        cadres à mâles,
                        chacun ayant un rôle spécifique dans le fonctionnement de la colonie.</p>
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/organisation-ruche.jpg`}
                        alt="Frelon asiatique qui attaque une abeille"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />
                </div>

                <div>
                    <h3>Cadre à male</h3>
                    <p>Un cadre à mâle est un cadre de ruche qui est spécialement conçu pour encourager la ponte des
                        faux-bourdons,
                        également appelés mâles, dans une colonie d'abeilles. Les faux-bourdons sont les abeilles mâles de la
                        colonie,
                        et leur seule fonction est de féconder la reine lors de son vol nuptial.

                        Les cadres à mâle sont généralement plus grands que les cadres standard utilisés pour le couvain ouvrier.
                        I
                        ls sont souvent construits avec des cellules plus grandes pour accommoder la taille plus importante des
                        faux-bourdons.

                        Les apiculteurs utilisent parfois des cadres à mâle dans leurs ruches pour contrôler la population de
                        faux-bourdons.
                        Par exemple, si une colonie produit un excès de faux-bourdons, cela peut affaiblir la colonie en utilisant
                        des
                        ressources pour élever des abeilles qui ne participent pas activement à la collecte de nectar ou au soin
                        des larves.
                        En retirant les cadres à mâle excédentaires, les apiculteurs peuvent maintenir un équilibre sain entre les
                        abeilles ouvrières
                        et les faux-bourdons dans la colonie.</p>

                    <div className="cadre">
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cadre-mal-G.jpg`}
                            alt="cadre à male G"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cadre-male.jpg`}
                            alt="cadre à male fermé"
                            style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                        />
                    </div>

                    <p className="p-intermediaire">Les autres cadres servent a la reine à pondre et aux abeilles a stocker les
                        reserves.
                        Les cadres de reserve se trouve aux extremite de la ruche et sont composé de miel ainsi que de pollen,
                        mais les reserves se trouve aussi au pourtour des cadres de couvains.
                        La reine va pondre les oeufs et nous parlons de couvains ouvert et de couvains fermé.</p>
                </div>

                <div>
                    <h3>Le couvain ouvert</h3>
                    <p>Le terme "couvain ouvert" est utilisé pour décrire les cellules où les larves sont visibles.
                        Pendant cette phase, les larves sont alimentées par des ouvrières qui leur donnent de la gelée royale,
                        un aliment riche en nutriments produit par des glandes situées dans leur tête. Les cellules contenant du
                        couvain ouvert sont généralement de forme hexagonale, comme les autres cellules de la ruche, et
                        sont situées au centre des rayons de la ruche.

                        Le couvain ouvert est un élément vital de la colonie d'abeilles, car il représente la prochaine génération
                        d'abeilles qui maintiendra la population de la ruche. Les apiculteurs surveillent souvent le couvain
                        ouvert
                        pour s'assurer que les larves se développent normalement et pour détecter tout signe de maladie ou de
                        problème
                        dans la colonie.</p>

                    <h3>Le couvain fermé</h3>
                    <p>Le couvain fermé désigne les cellules de la ruche où les larves d'abeilles sont en train de se développer
                        mais
                        ne sont pas encore visibles. Après l'éclosion des œufs pondus par la reine, les larves passent par
                        plusieurs stades
                        de croissance avant de se transformer en abeilles adultes. Pendant ces stades de développement,
                        les larves sont recouvertes d'une fine couche de cire qui scelle la cellule, d'où le terme "couvain
                        fermé".

                        Dans les premiers jours suivant l'éclosion des œufs, les larves se développent rapidement en consommant
                        la gelée royale nourricière fournie par les abeilles ouvrières. Pendant cette période, les cellules de
                        couvain
                        fermé apparaissent comme des alvéoles légèrement bombées dans les rayons de la ruche.

                        Les apiculteurs surveillent également le couvain fermé pour évaluer la santé de la colonie. Un couvain
                        sain
                        et uniformément fermé est un signe de bonne santé de la ruche, tandis que des problèmes tels que les
                        maladies ou
                        les infestations parasitaires peuvent se manifester par des anomalies dans le développement du couvain
                        fermé.</p>

                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/Couvain.png`}
                        alt="cadre couvain ferme"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/oeuf-larve.jpeg`}
                        alt="cadre couvain ouvert"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/provision.jpg`}
                        alt="cadre de provision"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />

                </div>

                <div>
                    <h3>Les cadres à miels</h3>
                    <p>Un cadre à miel est un composant clé d'une ruche apicole, offrant un espace organisé pour le stockage du
                        miel
                        produit par les abeilles. Fabriqué en bois et équipé d'une feuille de cire gaufrée à l'intérieur,
                        ce cadre permet aux abeilles de construire leurs alvéoles et d'y déposer le miel. Une fois le miel mûr,
                        les alvéoles sont operculées avec de la cire, préservant ainsi la qualité du miel. Les apiculteurs
                        retirent
                        les cadres à miel de la ruche pour récolter le miel, utilisant des extracteurs pour extraire le miel des
                        alvéoles sans les endommager. La rotation des cadres à miel favorise une production de miel continue et
                        permet
                        aux apiculteurs d'inspecter la santé de la colonie, évaluant la quantité de miel, la présence de maladies
                        et la qualité générale de la ruche.
                    </p>

                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cadre-G.webp`}
                        alt="cadre de miel G comparé a une G de corps"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/documentations/cadre-miel.jpeg`}
                        alt="cadre de miel"
                        style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                    />
                </div>
            </section>
        </div>
    )
}