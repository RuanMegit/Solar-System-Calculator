// https://solarsystemcalculator.com/

import { useState } from "react";
import "./Calculate.css";

function Calculate() {
  const [elecUsage, setElecUsage] = useState<number>(450);
  const [peakLoadKw, setPeakLoadKw] = useState<number>(3);
  const [panelWattage, setPanelWattage] = useState<number>(400);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(24);
  const [averageSunHours, setAverageSunHours] = useState<number>(5);
  const [batteryType, setBatteryType] = useState<"lithium" | "lead-acid">(
    "lithium",
  );
  const [autonomyDays, setAutonomyDays] = useState<number>(2);
  const [systemLosses, setSystemLosses] = useState<number>(20);

  // Daily consumption (kWh/day)
  const dailyConsumption = elecUsage > 0 ? elecUsage / 30 : 0;

  // Solar panel sizing
  const panelKw = panelWattage > 0 ? panelWattage / 1000 : 0;
  const energyPerPanelPerDay = panelKw * averageSunHours;
  const lossFactor = 1 + systemLosses / 100;

  const panelCount =
    energyPerPanelPerDay > 0
      ? Math.ceil((dailyConsumption / energyPerPanelPerDay) * lossFactor)
      : 0;

  const totalPanelWatts = panelCount * panelWattage;
  const dailyProduction = (totalPanelWatts / 1000) * averageSunHours;

  // Battery bank sizing (kWh and Ah)
  const dod = batteryType === "lithium" ? 0.8 : 0.5;
  const efficiency = batteryType === "lithium" ? 0.95 : 0.85;

  const batterySizeKwh =
    dod > 0 && efficiency > 0
      ? (dailyConsumption * autonomyDays) / (dod * efficiency)
      : 0;

  const batterySizeAh =
    batteryVoltage > 0
      ? Math.ceil((batterySizeKwh * 1000) / batteryVoltage)
      : 0;

  // Inverter size (kW) from peak simultaneous load + 30% surge margin
  const inverterSizeKw = peakLoadKw > 0 ? Math.ceil(peakLoadKw * 1.3) : 0;

  // MPPT charge controller size (Amps) + 25% safety margin
  const chargeSizeAmps =
    batteryVoltage > 0
      ? Math.ceil((totalPanelWatts / batteryVoltage) * 1.25)
      : 0;

  return (
    <main className="calculator">
      <section className="calculator-section">
        <h2>System Configuration</h2>
        <p className="section-description">
          Enter your electricity usage and select your preferred solar system
          specifications.
        </p>

        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="ElecUsage">Monthly Electricity Usage (kWh)</label>
            <input
              type="number"
              id="ElecUsage"
              min="0"
              value={elecUsage}
              onChange={(e) => setElecUsage(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="PeakLoad">Peak Simultaneous Load (kW)</label>
            <input
              type="number"
              id="PeakLoad"
              min="0"
              step="0.1"
              value={peakLoadKw}
              onChange={(e) => setPeakLoadKw(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="PanelWattage">Solar Panel Wattage (W)</label>
            <input
              type="number"
              id="PanelWattage"
              min="1"
              value={panelWattage}
              onChange={(e) => setPanelWattage(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="BatteryType">Battery Type</label>
            <select
              id="BatteryType"
              value={batteryType}
              onChange={(e) =>
                setBatteryType(e.target.value as "lithium" | "lead-acid")
              }
            >
              <option value="lithium">Lithium (LiFePO4)</option>
              <option value="lead-acid">Lead-Acid (AGM/GEL)</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="BatteryVoltage">Battery Voltage (V)</label>
            <select
              id="BatteryVoltage"
              value={batteryVoltage}
              onChange={(e) => setBatteryVoltage(Number(e.target.value))}
            >
              <option value={12}>12V</option>
              <option value={24}>24V</option>
              <option value={48}>48V</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="SunHours">Average Sun Hours</label>
            <input
              type="number"
              id="SunHours"
              min="0.5"
              step="0.5"
              value={averageSunHours}
              onChange={(e) => setAverageSunHours(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="AutonomyDays">Battery Autonomy (Days)</label>
            <input
              type="number"
              id="AutonomyDays"
              min="1"
              value={autonomyDays}
              onChange={(e) => setAutonomyDays(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="SystemLosses">System Losses (%)</label>
            <input
              type="number"
              id="SystemLosses"
              min="0"
              max="90"
              value={systemLosses}
              onChange={(e) => setSystemLosses(Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="results-heading">
          <h2>Recommended System</h2>
          <p className="section-description">
            Your estimated solar system requirements.
          </p>
        </div>

        <div className="results-grid">
          <div className="result-card">
            <span className="result-label">Solar Panels</span>
            <strong>{panelCount} Panels</strong>
            <span className="result-detail">
              {totalPanelWatts.toLocaleString()} W total capacity
            </span>
          </div>

          <div className="result-card">
            <span className="result-label">Daily Production</span>
            <strong>{dailyProduction.toFixed(2)} kWh</strong>
            <span className="result-detail">Estimated per day</span>
          </div>

          <div className="result-card">
            <span className="result-label">Daily Consumption</span>
            <strong>{dailyConsumption.toFixed(2)} kWh</strong>
            <span className="result-detail">Average per day</span>
          </div>

          <div className="result-card">
            <span className="result-label">Battery Bank</span>
            <strong>{batterySizeKwh.toFixed(2)} kWh</strong>
            <span className="result-detail">
              {batterySizeAh.toLocaleString()} Ah @ {batteryVoltage} V
            </span>
          </div>

          <div className="result-card">
            <span className="result-label">Inverter</span>
            <strong>{inverterSizeKw} kW</strong>
            <span className="result-detail">Recommended inverter capacity</span>
          </div>

          <div className="result-card">
            <span className="result-label">Charge Controller</span>
            <strong>{chargeSizeAmps} A</strong>
            <span className="result-detail">MPPT charge controller</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Calculate;
