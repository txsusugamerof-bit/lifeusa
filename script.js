/* =========================================
   LIFEUSA — SIMULADOR
   Todos os valores monetários = USD
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const startButton = document.getElementById("startButton");
const heroStart = document.getElementById("heroStart");
const ctaButton = document.getElementById("ctaButton");
const learnMore = document.getElementById("learnMore");

const simulator = document.getElementById("simulator-start");
const simulatorCard = document.querySelector(".simulator-card");


/* =========================================
   DADOS DAS CIDADES
=========================================

   housing = aluguel mensal não mobiliado
   furnishedHousing = aluguel mensal mobiliado
   homePrice = preço estimado de uma casa própria
   groceries = mercado mensal
   transport = custo mensal de transporte
========================================= */

const cities = {

    Florida: {

        Jacksonville: {
            name: "Jacksonville",
            state: "FL",
            housing: 1650,
            furnishedHousing: 1900,
            homePrice: 320000,
            groceries: 480,
            transport: 520
        },

        Orlando: {
            name: "Orlando",
            state: "FL",
            housing: 1850,
            furnishedHousing: 2150,
            homePrice: 410000,
            groceries: 500,
            transport: 540
        },

        Tampa: {
            name: "Tampa",
            state: "FL",
            housing: 1900,
            furnishedHousing: 2250,
            homePrice: 430000,
            groceries: 510,
            transport: 550
        },

        Miami: {
            name: "Miami",
            state: "FL",
            housing: 2600,
            furnishedHousing: 3100,
            homePrice: 620000,
            groceries: 600,
            transport: 650
        }

    },


    Texas: {

        Houston: {
            name: "Houston",
            state: "TX",
            housing: 1500,
            furnishedHousing: 1800,
            homePrice: 320000,
            groceries: 470,
            transport: 510
        },

        Dallas: {
            name: "Dallas",
            state: "TX",
            housing: 1750,
            furnishedHousing: 2100,
            homePrice: 390000,
            groceries: 490,
            transport: 530
        },

        Austin: {
            name: "Austin",
            state: "TX",
            housing: 2100,
            furnishedHousing: 2500,
            homePrice: 520000,
            groceries: 520,
            transport: 560
        }

    },


    "North Carolina": {

        Charlotte: {
            name: "Charlotte",
            state: "NC",
            housing: 1650,
            furnishedHousing: 1950,
            homePrice: 380000,
            groceries: 470,
            transport: 500
        },

        Raleigh: {
            name: "Raleigh",
            state: "NC",
            housing: 1600,
            furnishedHousing: 1900,
            homePrice: 390000,
            groceries: 465,
            transport: 490
        }

    },


    California: {

        "Los Angeles": {
            name: "Los Angeles",
            state: "CA",
            housing: 2900,
            furnishedHousing: 3500,
            homePrice: 950000,
            groceries: 600,
            transport: 650
        },

        "San Diego": {
            name: "San Diego",
            state: "CA",
            housing: 3000,
            furnishedHousing: 3600,
            homePrice: 900000,
            groceries: 610,
            transport: 640
        }

    }

};


/* =========================================
   ESTILOS DE VIDA
========================================= */

const lifestyleOptions = {

    simple: {
        name: "Essencial",
        description:
            "Uma vida confortável, mantendo os gastos sob controle.",
        multiplier: 0.85
    },

    comfortable: {
        name: "Confortável",
        description:
            "Equilíbrio entre conforto, lazer e organização financeira.",
        multiplier: 1
    },

    premium: {
        name: "Premium",
        description:
            "Mais conforto, lazer e espaço para compras e experiências.",
        multiplier: 1.3
    }

};


/* =========================================
   ESTADO DA SIMULAÇÃO
========================================= */

let simulation = {

    income: 0,

    state: null,

    city: null,

    lifestyle: null

};


/* =========================================
   NAVEGAÇÃO
========================================= */

function openSimulator() {

    if (!simulator) return;

    simulator.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function openHowItWorks() {

    const section =
        document.getElementById("entenda-custos");

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   EVENTOS DA HOME
========================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        openSimulator
    );

}


if (heroStart) {

    heroStart.addEventListener(
        "click",
        openSimulator
    );

}


if (ctaButton) {

    ctaButton.addEventListener(
        "click",
        openSimulator
    );

}


if (learnMore) {

    learnMore.addEventListener(
        "click",
        openHowItWorks
    );

}


/* =========================================
   ETAPAS
========================================= */

function updateSteps(activeStep) {

    const steps =
        document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.classList.remove("active");

        if (index < activeStep) {
            step.classList.add("active");
        }

    });

}


/* =========================================
   TROCAR CARD
========================================= */

function changeSimulatorContent(content) {

    if (!simulatorCard) return;

    simulatorCard.style.opacity = "0";

    simulatorCard.style.transform =
        "translateY(8px)";

    simulatorCard.innerHTML = content;

    requestAnimationFrame(() => {

        simulatorCard.style.opacity = "1";

        simulatorCard.style.transform =
            "translateY(0)";

    });

    simulatorCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   ETAPA 1 — RENDA
========================================= */

function renderIncomeStep() {

    updateSteps(1);

    changeSimulatorContent(`

        <div class="step-indicator">

            <div class="step active">
                <span>01</span>
                <small>Renda</small>
            </div>

            <div class="step-line"></div>

            <div class="step">
                <span>02</span>
                <small>Localização</small>
            </div>

            <div class="step-line"></div>

            <div class="step">
                <span>03</span>
                <small>Estilo de vida</small>
            </div>

        </div>


        <div class="question">

            <span class="question-label">
                PASSO 01
            </span>

            <h3>
                Quanto você ganha por mês?
            </h3>

            <p>
                Informe sua renda mensal
                <strong>bruta</strong> em dólares americanos.
            </p>


            <div class="money-input">

                <span>US$</span>

                <input
                    type="number"
                    id="incomeInput"
                    placeholder="5,000"
                    min="0"
                    step="100"
                >

                <span>USD / mês</span>

            </div>


            <div class="input-explanation">
                Exemplo:
                <strong>US$ 5.000</strong>
                significa cinco mil dólares americanos.
            </div>


            <button
                type="button"
                class="simulator-next"
                id="incomeNext"
            >
                Continuar
                <span>→</span>
            </button>

        </div>

    `);

    setupIncomeButton();

}


/* =========================================
   CONFIGURA RENDA
========================================= */

function setupIncomeButton() {

    const incomeInput =
        document.getElementById("incomeInput");

    const incomeNext =
        document.getElementById("incomeNext");

    if (!incomeInput || !incomeNext) return;


    incomeNext.addEventListener(
        "click",
        function () {

            const value =
                Number(incomeInput.value);

            if (!value || value <= 0) {

                incomeInput.focus();

                incomeInput.style.borderColor =
                    "#b94a48";

                setTimeout(() => {

                    incomeInput.style.borderColor =
                        "";

                }, 1500);

                return;

            }

            simulation.income = value;

            renderLocationStep();

        }
    );


    incomeInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                incomeNext.click();
            }

        }
    );

}


/* =========================================
   ETAPA 2 — ESTADOS
========================================= */

function renderLocationStep() {

    updateSteps(2);

    const stateNames =
        Object.keys(cities);


    const stateButtons =
        stateNames.map(state => {

            const numberOfCities =
                Object.keys(cities[state]).length;

            return `

                <button
                    class="choice-card state-choice"
                    data-state="${state}"
                    type="button"
                >

                    <span class="choice-card-title">
                        ${state}
                    </span>

                    <span class="choice-card-description">
                        ${numberOfCities}
                        ${numberOfCities === 1
                            ? "cidade"
                            : "cidades"}
                        disponíveis
                    </span>

                    <span class="choice-arrow">
                        →
                    </span>

                </button>

            `;

        }).join("");


    changeSimulatorContent(`

        <div class="step-indicator">

            <div class="step active">
                <span>01</span>
                <small>Renda</small>
            </div>

            <div class="step-line active-line"></div>

            <div class="step active">
                <span>02</span>
                <small>Localização</small>
            </div>

            <div class="step-line"></div>

            <div class="step">
                <span>03</span>
                <small>Estilo de vida</small>
            </div>

        </div>


        <div class="question location-question">

            <span class="question-label">
                PASSO 02
            </span>

            <h3>
                Onde você quer viver?
            </h3>

            <p>
                Primeiro escolha um estado.
            </p>

            <div class="choice-grid">

                ${stateButtons}

            </div>

        </div>

    `);


    setupStateButtons();

}


/* =========================================
   ESTADO
========================================= */

function setupStateButtons() {

    const buttons =
        document.querySelectorAll(
            ".state-choice"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                simulation.state =
                    this.dataset.state;

                this.classList.add("selected");

                setTimeout(() => {

                    renderCityStep();

                }, 120);

            }
        );

    });

}


/* =========================================
   ETAPA 2 — CIDADES
========================================= */

function renderCityStep() {

    const state =
        simulation.state;

    if (!state || !cities[state]) {

        renderLocationStep();

        return;

    }


    const stateCities =
        cities[state];


    const cityButtons =
        Object.entries(stateCities)

            .map(([cityKey, city]) => {

                return `

                    <button
                        class="choice-card city-choice"
                        data-city="${cityKey}"
                        type="button"
                    >

                        <div>

                            <span class="choice-card-title">
                                ${city.name}
                            </span>

                            <span class="choice-card-description">
                                ${city.state}
                                · aluguel desde
                                ${formatMoney(city.housing)}
                            </span>

                        </div>

                        <span class="choice-arrow">
                            →
                        </span>

                    </button>

                `;

            })
            .join("");


    changeSimulatorContent(`

        <div class="step-indicator">

            <div class="step active">
                <span>01</span>
                <small>Renda</small>
            </div>

            <div class="step-line active-line"></div>

            <div class="step active">
                <span>02</span>
                <small>Localização</small>
            </div>

            <div class="step-line"></div>

            <div class="step">
                <span>03</span>
                <small>Estilo de vida</small>
            </div>

        </div>


        <div class="question location-question">

            <span class="question-label">
                PASSO 02
            </span>

            <h3>
                Qual cidade?
            </h3>

            <p>
                Escolha onde sua vida vai acontecer.
            </p>


            <div class="selected-location">
                ${state}
            </div>


            <div class="choice-grid">

                ${cityButtons}

            </div>


            <button
                type="button"
                class="back-button"
                id="backToStates"
            >
                ← Voltar para estados
            </button>

        </div>

    `);


    setupCityButtons();

}


/* =========================================
   CIDADE
========================================= */

function setupCityButtons() {

    const buttons =
        document.querySelectorAll(
            ".city-choice"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                simulation.city =
                    this.dataset.city;

                this.classList.add("selected");

                setTimeout(() => {

                    renderLifestyleStep();

                }, 120);

            }
        );

    });


    const backButton =
        document.getElementById(
            "backToStates"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            renderLocationStep
        );

    }

}


/* =========================================
   ETAPA 3 — ESTILO DE VIDA
========================================= */

function renderLifestyleStep() {

    updateSteps(3);


    const lifestyleButtons =
        Object.entries(lifestyleOptions)

            .map(([key, option], index) => {

                const number =
                    String(index + 1)
                        .padStart(2, "0");


                return `

                    <button
                        type="button"
                        class="lifestyle-card"
                        data-lifestyle="${key}"
                    >

                        <div class="lifestyle-number">
                            ${number}
                        </div>

                        <div class="lifestyle-content">

                            <strong>
                                ${option.name}
                            </strong>

                            <span>
                                ${option.description}
                            </span>

                        </div>

                        <span class="choice-arrow">
                            →
                        </span>

                    </button>

                `;

            })
            .join("");


    changeSimulatorContent(`

        <div class="step-indicator">

            <div class="step active">
                <span>01</span>
                <small>Renda</small>
            </div>

            <div class="step-line active-line"></div>

            <div class="step active">
                <span>02</span>
                <small>Localização</small>
            </div>

            <div class="step-line active-line"></div>

            <div class="step active">
                <span>03</span>
                <small>Estilo de vida</small>
            </div>

        </div>


        <div class="question lifestyle-question">

            <span class="question-label">
                PASSO 03
            </span>

            <h3>
                Como você quer viver?
            </h3>

            <p>
                Isso ajuda o LifeUSA a estimar seus gastos.
            </p>


            <div class="lifestyle-grid">

                ${lifestyleButtons}

            </div>


            <button
                type="button"
                class="back-button"
                id="backToCities"
            >
                ← Voltar para cidades
            </button>

        </div>

    `);


    setupLifestyleButtons();

}


/* =========================================
   ESTILO
========================================= */

function setupLifestyleButtons() {

    const buttons =
        document.querySelectorAll(
            ".lifestyle-card"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(item => {

                    item.classList.remove(
                        "selected"
                    );

                });


                this.classList.add(
                    "selected"
                );


                simulation.lifestyle =
                    this.dataset.lifestyle;


                setTimeout(() => {

                    renderResult();

                }, 250);

            }
        );

    });


    const backButton =
        document.getElementById(
            "backToCities"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            renderCityStep
        );

    }

}


/* =========================================
   IMPOSTO FEDERAL ESTIMADO
=========================================

   IMPORTANTE:

   Isso NÃO é um cálculo tributário oficial.

   É uma aproximação educacional para mostrar
   a diferença entre renda bruta e renda líquida.

   O cálculo considera:
   - dedução padrão
   - faixas federais progressivas de 2026
   - Social Security
   - Medicare

   Não inclui todos os créditos, deduções,
   benefícios, situação migratória, filing status
   ou particularidades fiscais.
========================================= */

function estimateFederalIncomeTax(
    annualIncome,
    filingStatus = "single"
) {

    const standardDeduction =
        filingStatus === "married"
            ? 32200
            : 16100;


    const taxableIncome =
        Math.max(
            0,
            annualIncome - standardDeduction
        );


    const brackets = [

        {
            limit: 12400,
            rate: 0.10
        },

        {
            limit: 50400,
            rate: 0.12
        },

        {
            limit: 105700,
            rate: 0.22
        },

        {
            limit: 201775,
            rate: 0.24
        },

        {
            limit: 256225,
            rate: 0.32
        },

        {
            limit: 640600,
            rate: 0.35
        },

        {
            limit: Infinity,
            rate: 0.37
        }

    ];


    let tax = 0;
    let previousLimit = 0;


    for (const bracket of brackets) {

        if (taxableIncome <= previousLimit) {
            break;
        }


        const taxableInBracket =
            Math.min(
                taxableIncome,
                bracket.limit
            ) - previousLimit;


        tax +=
            taxableInBracket *
            bracket.rate;


        previousLimit =
            bracket.limit;

    }


    return Math.max(
        0,
        tax
    );

}


/* =========================================
   PAYROLL TAX
========================================= */

function estimatePayrollTaxes(annualIncome) {

    const socialSecurity =
        Math.min(
            annualIncome,
            184500
        ) * 0.062;


    const medicare =
        annualIncome * 0.0145;


    let additionalMedicare = 0;


    if (annualIncome > 200000) {

        additionalMedicare =
            (annualIncome - 200000)
            * 0.009;

    }


    return (
        socialSecurity +
        medicare +
        additionalMedicare
    );

}


/* =========================================
   IMPOSTOS TOTAIS
========================================= */

function estimateTaxes(monthlyIncome) {

    const annualIncome =
        monthlyIncome * 12;


    const federalTax =
        estimateFederalIncomeTax(
            annualIncome
        );


    const payrollTax =
        estimatePayrollTaxes(
            annualIncome
        );


    const annualTaxes =
        federalTax +
        payrollTax;


    return {

        annual: annualTaxes,

        monthly:
            annualTaxes / 12,

        effectiveRate:
            annualIncome > 0
                ? annualTaxes / annualIncome
                : 0

    };

}


/* =========================================
   RESULTADO
========================================= */

function renderResult() {

    if (
        !simulation.state ||
        !simulation.city ||
        !simulation.lifestyle
    ) {

        return;

    }


    const city =
        cities[
            simulation.state
        ][
            simulation.city
        ];


    const lifestyle =
        lifestyleOptions[
            simulation.lifestyle
        ];


    /*
       O aluguel agora continua sendo aluguel.
       O multiplicador representa o estilo de vida.
    */

    const housing =
        Math.round(
            city.housing *
            lifestyle.multiplier
        );


    const groceries =
        Math.round(
            city.groceries *
            lifestyle.multiplier
        );


    const transport =
        Math.round(
            city.transport *
            lifestyle.multiplier
        );


    const otherExpenses =
        Math.round(
            300 *
            lifestyle.multiplier
        );


    /*
       Estimativa de impostos sobre a renda.
    */

    const taxes =
        estimateTaxes(
            simulation.income
        );


    /*
       Seguro/saúde/outros custos
       ficam dentro de "outros" nesta versão.
    */

    const totalExpensesBeforeTaxes =
        housing +
        groceries +
        transport +
        otherExpenses;


    const netIncome =
        Math.max(
            0,
            simulation.income -
            taxes.monthly
        );


    const remaining =
        netIncome -
        totalExpensesBeforeTaxes;


    const comfortableIncome =
        Math.round(
            (
                totalExpensesBeforeTaxes /
                0.75
            )
        );


    let score;


    if (remaining >= 2500) {

        score = 95;

    }

    else if (remaining >= 1500) {

        score = 88;

    }

    else if (remaining >= 1000) {

        score = 80;

    }

    else if (remaining >= 500) {

        score = 70;

    }

    else if (remaining >= 0) {

        score = 58;

    }

    else {

        score = 35;

    }


    const furnished =
        Math.round(
            city.furnishedHousing *
            lifestyle.multiplier
        );


    changeSimulatorContent(`

        <div class="result-header">

            <span class="question-label">
                SUA SIMULAÇÃO
            </span>


            <div class="result-location">

                <div>

                    <small>
                        YOUR LIFE
                    </small>

                    <h3>
                        ${city.name}, ${city.state}
                    </h3>

                </div>


                <div class="location-icon">
                    ${city.state}
                </div>

            </div>

        </div>


        <div class="result-score-area">

            <div>

                <span class="result-label">
                    LIFE SCORE
                </span>

                <div class="big-score">
                    ${score}
                </div>

                <strong>
                    ${getScoreMessage(score)}
                </strong>

            </div>


            <div class="result-summary">

                <span>
                    Sua renda bruta
                </span>

                <strong>
                    ${formatMoney(
                        simulation.income
                    )}
                </strong>

                <small>
                    por mês · USD
                </small>

            </div>

        </div>


        <div class="tax-result-card">

            <span>
                RENDA APÓS IMPOSTOS · ESTIMATIVA
            </span>


            <div class="tax-result-row">

                <span>
                    Renda bruta
                </span>

                <strong>
                    ${formatMoney(
                        simulation.income
                    )}
                </strong>

            </div>


            <div class="tax-result-row">

                <span>
                    Impostos/contribuições estimados
                </span>

                <strong>
                    − ${formatMoney(
                        taxes.monthly
                    )}
                </strong>

            </div>


            <div class="tax-result-row net">

                <span>
                    Renda líquida estimada
                </span>

                <strong>
                    ${formatMoney(
                        netIncome
                    )}
                </strong>

            </div>

        </div>


        <div class="result-grid">

            <div class="result-box">

                <span>
                    Aluguel
                </span>

                <strong>
                    ${formatMoney(housing)}
                </strong>

                <small>
                    mensal · não mobiliado
                </small>

            </div>


            <div class="result-box">

                <span>
                    Mobiliado
                </span>

                <strong>
                    ${formatMoney(furnished)}
                </strong>

                <small>
                    aluguel mensal estimado
                </small>

            </div>


            <div class="result-box">

                <span>
                    Mercado
                </span>

                <strong>
                    ${formatMoney(groceries)}
                </strong>

                <small>
                    mensal
                </small>

            </div>


            <div class="result-box">

                <span>
                    Transporte
                </span>

                <strong>
                    ${formatMoney(transport)}
                </strong>

                <small>
                    mensal
                </small>

            </div>

        </div>


        <div class="result-remaining">

            <div>

                <span>
                    Gastos mensais
                </span>

                <strong>
                    ${formatMoney(
                        totalExpensesBeforeTaxes
                    )}
                </strong>

            </div>


            <div class="remaining-value">

                <span>
                    Sobra após impostos + gastos
                </span>

                <strong>
                    ${formatMoney(
                        remaining
                    )}
                </strong>

            </div>

        </div>


        <div class="recommended-income">

            <span>
                RENDA MENSAL RECOMENDADA
            </span>

            <strong>
                ${formatMoney(
                    comfortableIncome
                )}

                <small>
                    / mês
                </small>
            </strong>

            <p>
                Estimativa baseada nos gastos mensais
                do cenário e em uma margem financeira.
            </p>

        </div>


        <div class="recommended-income">

            <span>
                CASA PRÓPRIA · REFERÊNCIA
            </span>

            <strong>
                ${formatMoney(
                    city.homePrice
                )}
            </strong>

            <p>
                Valor total estimado de uma casa na região.
                Isso é diferente do aluguel mensal e não
                representa uma parcela de financiamento.
            </p>

        </div>


        <button
            type="button"
            class="simulator-next"
            id="restartSimulation"
        >

            Refazer simulação

            <span>
                ↻
            </span>

        </button>

    `);


    const restartButton =
        document.getElementById(
            "restartSimulation"
        );


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            restartSimulation
        );

    }

}


/* =========================================
   FORMATAR DINHEIRO
========================================= */

function formatMoney(value) {

    const sign =
        value < 0
            ? "- "
            : "";


    const absoluteValue =
        Math.abs(value);


    return sign +
        "US$ " +
        absoluteValue.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }
        );

}


/* =========================================
   SCORE
========================================= */

function getScoreMessage(score) {

    if (score >= 90) {
        return "Muito confortável";
    }

    if (score >= 80) {
        return "Confortável";
    }

    if (score >= 70) {
        return "Equilibrado";
    }

    if (score >= 50) {
        return "Atenção aos gastos";
    }

    return "Orçamento apertado";

}


/* =========================================
   RECOMEÇAR
========================================= */

function restartSimulation() {

    simulation = {

        income: 0,
        state: null,
        city: null,
        lifestyle: null

    };


    renderIncomeStep();

}


/* =========================================
   INICIAR
========================================= */

const existingIncomeInput =
    document.getElementById(
        "incomeInput"
    );


const existingIncomeNext =
    document.getElementById(
        "incomeNext"
    );


if (
    existingIncomeInput &&
    existingIncomeNext
) {

    setupIncomeButton();

}