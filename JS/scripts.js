
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

        // Calcular multiplicador (Strain / Bonus) en tiempo real
        document.getElementById('strain').addEventListener('input', updateMultiplier);
        document.getElementById('attunementBonus').addEventListener('input', updateMultiplier);
        
        function updateMultiplier() {
            const strain = parseFloat(document.getElementById('strain').value) || 0;
            const bonus = parseFloat(document.getElementById('attunementBonus').value) || 1;
            const multiplier = (strain / bonus).toFixed(2);
            document.getElementById('strainMultiplier').value = multiplier;
        }

        // Calcular Overall Est Value
        document.getElementById('weaponForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const baseValue = parseFloat(document.getElementById('baseValue').value);
            const strain = parseFloat(document.getElementById('strain').value);
            const attunementBonus = parseFloat(document.getElementById('attunementBonus').value);
            const harmonySpent = parseFloat(document.getElementById('harmonySpent').value);
            const silverCost = parseFloat(document.getElementById('silverCost').value);
            const siphonedQty = parseInt(document.getElementById('siphonedQty').textContent);
            const siphonedPrice = parseFloat(document.getElementById('siphonedPrice').value);
            const avalonQty = parseInt(document.getElementById('avalonQty').textContent);
            const avalonPrice = parseFloat(document.getElementById('avalonPrice').value);
            const communityMultiplier = parseFloat(document.getElementById('communityMultiplier').value) || 30;
            
            // Calcular costos de energía
            const energyCost = (siphonedQty * siphonedPrice) + (avalonQty * avalonPrice);
            
            // Calcular valores
            const strainMultiplier = strain / attunementBonus;
            const totalBase = baseValue + silverCost + energyCost;
            
            // Valor estimado (tu multiplicador)
            const realValue = totalBase + (strainMultiplier * harmonySpent);
            
            // Valor Comunidad
            const communityValue = totalBase + (communityMultiplier * harmonySpent);
            
            // Mostrar resultados
            document.getElementById('realValue').textContent = realValue.toLocaleString('es');
            document.getElementById('communityValue').textContent = communityValue.toLocaleString('es');
            document.getElementById('usedCommunityMultiplier').textContent = communityMultiplier;
            
            // Calcular diferencia
            const difference = realValue - communityValue;
            const differenceElement = document.getElementById('difference');
            
            if (difference > 0) {
                differenceElement.innerHTML = `Tu valor es <span style="color: var(--accent)">+${difference.toLocaleString('es')}</span> silver más alto`;
            } else if (difference < 0) {
                differenceElement.innerHTML = `Tu valor es <span style="color: var(--community)">${difference.toLocaleString('es')}</span> silver más bajo`;
            } else {
                differenceElement.innerHTML = "Los valores son iguales";
            }
            
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
        });

        // Inicializar
        updateMultiplier();
  