import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import "@site/src/i18n.js";
import { useTranslation } from "react-i18next";

const MentalHealthQuestionnaire = () => {
    // Translation
    const { t } = useTranslation();

    // Initial state setup
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Questions and options setup
    const totalQuestions = 16;
    const questions = [];

    for (let i = 1; i <= totalQuestions; i++) {
        questions.push({
            id: i,
            text: t(`MentalHealthQuestionnaireStrings.question${i}`),
        });
    }

    const options = [
        { score: 0, text: t("MentalHealthQuestionnaireStrings.option1") },
        { score: 1, text: t("MentalHealthQuestionnaireStrings.option2") },
        { score: 2, text: t("MentalHealthQuestionnaireStrings.option3") },
        { score: 3, text: t("MentalHealthQuestionnaireStrings.option4") },
    ];

    // Handle option change
    const handleOptionChange = (questionId, score) => {
        setAnswers({ ...answers, [questionId]: score });
        // Check if all required questions are answered to potentially remove validation
        // Exclude question 16 from causing validation to show
        if (showValidation && questionId !== 16) {
            const isAllNowAnswered = questions.slice(0, -1).every((q) => answers[q.id] !== undefined || parseInt(questionId) === q.id);
            setShowValidation(!isAllNowAnswered);
        }
    };

    // Set modal state
    const [showModal, setShowModal] = useState(false);

    // Set input validation state
    const [showValidation, setShowValidation] = useState(false);

    // Submit handler
    const handleSubmit = () => {
        // Question 16 is the optional one
        const isAllAnswered = questions.slice(0, -1).every((question) => answers[question.id] !== undefined);

        if (!isAllAnswered) {
            setShowModal(true); // Show the modal if not all questions are answered
            setShowValidation(true); // Trigger validation messages
        } else {
            setIsSubmitted(true); // Otherwise, proceed to show the results
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            }); // Scroll to top after submitting
        }
    };

    // Reset quiz
    const resetQuiz = () => {
        setAnswers({});
        setIsSubmitted(false);
        setShowValidation(false);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        }); // Scroll to top
    };

    // Calculate results
    const calculateResults = () => {
        let anxietyScore = 0;
        let depressionScore = 0;

        Object.entries(answers).forEach(([questionId, score]) => {
            if (parseInt(questionId) <= 7) anxietyScore += score;
            else depressionScore += score;
        });

        return { anxietyScore, depressionScore };
    };

    // Render questions
    const renderQuestions = () => (
        <div>
            <h2>{t("MentalHealthQuestionnaireStrings.heading")}</h2>
            {questions.map((question) => (
                <div key={question.id} className={`mb-4 form-group ${showValidation && answers[question.id] === undefined ? "has-validation" : ""}`}>
                    <div className="mb-2 fw-semibold">
                        {t("MentalHealthQuestionnaireStrings.questionMain")}
                        {question.id}. {question.text}
                    </div>
                    {options.map((option, index) => (
                        <div className="form-check" key={index}>
                            <input
                                type="radio"
                                className={`form-check-input ${
                                    showValidation && answers[question.id] === undefined && question.id !== 16 ? "is-invalid" : ""
                                }`}
                                name={`question-${question.id}`}
                                value={option.score}
                                id={`answser-${question.id}-index${index}`}
                                onChange={() => handleOptionChange(question.id, option.score)}
                            />
                            <label className="form-check-label" htmlFor={`answser-${question.id}-index${index}`}>
                                {option.text}
                            </label>
                            {showValidation && answers[question.id] === undefined && question.id !== 16 && (
                                <div className="invalid-feedback">{t("MentalHealthQuestionnaireStrings.questionNotSelectedWarn")}</div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <Button onClick={handleSubmit}>{t("MentalHealthQuestionnaireStrings.submitButton")}</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-5 fw-bold">{t("MentalHealthQuestionnaireStrings.modalHeaderIncomplete")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("MentalHealthQuestionnaireStrings.modalBodyIncomplete")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        {t("MentalHealthQuestionnaireStrings.modalCloseButtonIncomplete")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    // Render results with Bootstrap progress bars
    const renderResults = () => {
        const { anxietyScore, depressionScore } = calculateResults();

        const getAnxietyRiskLevel = (score) => {
            if (score <= 4) return t("MentalHealthQuestionnaireStrings.minimalRisk");
            if (score <= 9) return t("MentalHealthQuestionnaireStrings.mildRisk");
            if (score <= 14) return t("MentalHealthQuestionnaireStrings.moderateRisk");
            return t("MentalHealthQuestionnaireStrings.severeRisk"); // Scores 15-21
        };

        const getDepressionRiskLevel = (score) => {
            if (score <= 4) return t("MentalHealthQuestionnaireStrings.minimalRisk");
            if (score <= 9) return t("MentalHealthQuestionnaireStrings.mildRisk");
            if (score <= 14) return t("MentalHealthQuestionnaireStrings.moderateRisk");
            if (score <= 19) return t("MentalHealthQuestionnaireStrings.moderateToSevere");
            return t("MentalHealthQuestionnaireStrings.severeRisk"); // Scores 20-27
        };

        const getAnxietyProgressBarSegments = (anxietyScore) => {
            let emptyWidth = "0%";
            let activeWidth = "25%"; // Active segment always 25%

            if (anxietyScore <= 4) {
                // Minimal
                emptyWidth = "0%";
            } else if (anxietyScore <= 9) {
                // Mild
                emptyWidth = "25%";
            } else if (anxietyScore <= 14) {
                // Moderate
                emptyWidth = "50%";
            } else {
                // Severe
                emptyWidth = "75%";
            }

            return { emptyWidth, activeWidth };
        };

        const { emptyWidth: anxietyEmptyWidth, activeWidth: anxietyActiveWidth } = getAnxietyProgressBarSegments(anxietyScore);

        const getDepressionProgressBarSegments = (depressionScore) => {
            let emptyWidth = "0%";
            let activeWidth = "20%";

            if (depressionScore <= 4) {
                // Minimal
                emptyWidth = "0%";
            } else if (depressionScore <= 9) {
                // Mild
                emptyWidth = "20%";
            } else if (depressionScore <= 14) {
                // Moderate
                emptyWidth = "40%";
            } else if (depressionScore <= 19) {
                // Moderate to Severe
                emptyWidth = "60%";
            } else {
                // Severe
                emptyWidth = "80%";
            }

            return { emptyWidth, activeWidth };
        };

        const { emptyWidth: depressionEmptyWidth, activeWidth: depressionActiveWidth } = getDepressionProgressBarSegments(depressionScore);

        return (
            <div>
                <div className="mb-3">
                    <h3>{t("MentalHealthQuestionnaireStrings.resultHeading")}</h3>
                    <div>
                        <span className="fw-semibold">{t("MentalHealthQuestionnaireStrings.anxietyRiskResult")}</span>{" "}
                        {getAnxietyRiskLevel(anxietyScore)}
                    </div>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{ width: anxietyEmptyWidth, backgroundColor: "var(--bs-progress-bg)" }}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        <div
                            className="progress-bar bg-primary"
                            style={{ width: anxietyActiveWidth }}
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex">
                        <div className="py-2">{t("MentalHealthQuestionnaireStrings.noneResultBar")} (0-4)</div>
                        <div className="ms-auto py-2">{t("MentalHealthQuestionnaireStrings.severeResultBar")} (15-21)</div>
                    </div>
                    <p>{t("MentalHealthQuestionnaireStrings.anxietyRiskPara1")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.anxietyRiskPara2")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.anxietyRiskPara3")}</p>
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <div className="fw-semibold">{t("MentalHealthQuestionnaireStrings.yourAnswersAccordion")}</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {questions.slice(0, 7).map((question, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>
                                                {t("MentalHealthQuestionnaireStrings.questionMain")} {index + 1}:
                                            </strong>{" "}
                                            {question.text}
                                            <br />
                                            <strong>{t("MentalHealthQuestionnaireStrings.answerMain")}</strong>{" "}
                                            {answers[question.id] !== undefined
                                                ? options[answers[question.id]].text
                                                : t("MentalHealthQuestionnaireStrings.noAnswer")}
                                        </p>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <div className="fw-semibold">{t("MentalHealthQuestionnaireStrings.resultMeaningAccordion")}</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.minimalRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.anxietyRiskResultMeaning1")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.mildRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.anxietyRiskResultMeaning2")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.moderateRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.anxietyRiskResultMeaning3")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.severeRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.anxietyRiskResultMeaning4")}
                                </p>
                                <p className="mb-0">
                                    <small>{t("MentalHealthQuestionnaireStrings.anxietyRiskResultCopyright")}</small>
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="mb-4"></div>
                    <div className="border-bottom"></div>
                    <div className="mt-4"></div>
                    <div>
                        <span className="fw-semibold">{t("MentalHealthQuestionnaireStrings.depressionRiskResult")}</span>{" "}
                        {getDepressionRiskLevel(depressionScore)}
                    </div>
                    <div className="progress">
                        {/* Empty segment */}
                        <div
                            className="progress-bar"
                            style={{ width: depressionEmptyWidth, backgroundColor: "var(--bs-progress-bg)" }}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        {/* Active segment */}
                        <div
                            className="progress-bar bg-primary"
                            style={{ width: depressionActiveWidth }}
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex">
                        <div className="py-2">{t("MentalHealthQuestionnaireStrings.noneResultBar")} (0-4)</div>
                        <div className="ms-auto py-2">{t("MentalHealthQuestionnaireStrings.severeResultBar")} (20-27)</div>
                    </div>
                    <p>{t("MentalHealthQuestionnaireStrings.depressionRiskPara1")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.depressionRiskPara2")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.depressionRiskPara3")}</p>
                    <Accordion className="mb-4" alwaysOpen>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <div className="fw-semibold">{t("MentalHealthQuestionnaireStrings.yourAnswersAccordion")}</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {questions.slice(7, 16).map((question, index) => (
                                    <div key={index + 7}>
                                        <p>
                                            <strong>
                                                {t("MentalHealthQuestionnaireStrings.questionMain")} {index + 8}:
                                            </strong>{" "}
                                            {question.text}
                                            <br />
                                            <strong>{t("MentalHealthQuestionnaireStrings.answerMain")}</strong>{" "}
                                            {answers[question.id] !== undefined
                                                ? options[answers[question.id]].text
                                                : t("MentalHealthQuestionnaireStrings.noAnswer")}
                                        </p>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                <div className="fw-semibold">{t("MentalHealthQuestionnaireStrings.resultMeaningAccordion")}</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.minimalRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.depressionResultMeaning1")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.mildRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.depressionResultMeaning2")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.moderateRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.depressionResultMeaning3")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.moderateToSevere")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.depressionResultMeaning4")}
                                </p>
                                <p>
                                    <strong>{t("MentalHealthQuestionnaireStrings.severeRisk")}</strong>
                                    <br />
                                    {t("MentalHealthQuestionnaireStrings.depressionResultMeaning5")}
                                </p>
                                <p className="mb-0">
                                    <small>{t("MentalHealthQuestionnaireStrings.depressioRiskResultCopyright")}</small>
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <h3>{t("MentalHealthQuestionnaireStrings.aboutHeading")}</h3>
                    <p>{t("MentalHealthQuestionnaireStrings.aboutPara1")}</p>
                    <p>
                        <small>{t("MentalHealthQuestionnaireStrings.aboutPara2")}</small>
                    </p>
                    <h3>{t("MentalHealthQuestionnaireStrings.nextStepsHeading")}</h3>
                    <p>{t("MentalHealthQuestionnaireStrings.nextStepsPara1")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.nextStepsPara2")}</p>
                    <p>{t("MentalHealthQuestionnaireStrings.nextStepsPara3")}</p>
                </div>
                <Button onClick={resetQuiz}>{t("MentalHealthQuestionnaireStrings.retakeButton")}</Button>
            </div>
        );
    };

    return <div>{!isSubmitted ? renderQuestions() : renderResults()}</div>;
};

export default MentalHealthQuestionnaire;
