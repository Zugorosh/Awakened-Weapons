  // Datos de energías requeridas por Tier (Siphoned + Avalonian)
        const tierEnergyData = {
            '4': { siphoned: 3, avalon: 3 },
            '5': { siphoned: 6, avalon: 6 },
            '6': { siphoned: 13, avalon: 13 },
            '7': { siphoned: 34, avalon: 34 },
            '8': { siphoned: 100, avalon: 100 }
        };

        // Actualizar cantidades de energía al cambiar el Tier
        document.getElementById('tier').addEventListener('change', function() {
            const tier = this.value;
            document.getElementById('siphonedQty').textContent = tierEnergyData[tier].siphoned;
            document.getElementById('avalonQty').textContent = tierEnergyData[tier].avalon;
        });

        // Calcular multiplicador (Strain / Bonus) y calidad del arma
        document.getElementById('strain').addEventListener('input', updateMultiplier);
        document.getElementById('attunementBonus').addEventListener('input', updateMultiplier);
        
        function updateMultiplier() {
            const strain = parseFloat(document.getElementById('strain').value) || 0;
            const bonus = parseFloat(document.getElementById('attunementBonus').value) || 1;
            const multiplier = (strain / bonus).toFixed(2);
            document.getElementById('strainMultiplier').value = multiplier;
            
            // Evaluar calidad del arma
            const qualityIndicator = document.getElementById('qualityIndicator');
            if (multiplier > 30) {
                qualityIndicator.textContent = "⚠️ Mala calidad (Strain muy alto)";
                qualityIndicator.className = "quality-indicator quality-bad";
            } else if (multiplier > 20) {
                qualityIndicator.textContent = "⚠️ Calidad regular";
                qualityIndicator.className = "quality-indicator quality-warning";
            } else {
                qualityIndicator.textContent = "✓ Buena calidad";
                qualityIndicator.className = "quality-indicator quality-good";
            }
        }

        // Calcular valor final
        document.getElementById('weaponForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const baseValue = parseFloat(document.getElementById('baseValue').value);
            const harmonySpent = parseFloat(document.getElementById('harmonySpent').value);
            const silverCost = parseFloat(document.getElementById('silverCost').value);
            const siphonedQty = parseInt(document.getElementById('siphonedQty').textContent);
            const siphonedPrice = parseFloat(document.getElementById('siphonedPrice').value);
            const avalonQty = parseInt(document.getElementById('avalonQty').textContent);
            const avalonPrice = parseFloat(document.getElementById('avalonPrice').value);
            const communityMultiplier = parseFloat(document.getElementById('communityMultiplier').value) || 30;
            
            // Calcular costos de energía
            const energyCost = (siphonedQty * siphonedPrice) + (avalonQty * avalonPrice);
            
            // Calcular valor total
            const totalValue = baseValue + silverCost + energyCost + (communityMultiplier * harmonySpent);
            
            // Mostrar resultado
            document.getElementById('resultValue').textContent = totalValue.toLocaleString('es');
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
        });

        // Inicializar

        updateMultiplier();
