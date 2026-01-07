// API route for contact form - handles secure webhook proxy to n8n
export const prerender = false; // Route dynamique

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // 1. Récupérer les variables d'environnement
  const webhookUrl = import.meta.env.N8N_WEBHOOK_URL;
  const webhookToken = import.meta.env.N8N_WEBHOOK_TOKEN;

  // 2. Vérifier que les variables sont configurées
  if (!webhookUrl || !webhookToken) {
    return new Response(JSON.stringify({ error: 'Configuration serveur manquante' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 3. Parser le body JSON
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Données invalides' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. Valider les champs requis
  const { name, email, message } = data;
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Champs requis manquants' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 5. Valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Email invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 6. Construire les paramètres pour n8n (GET avec query params comme l'original)
  const params = new URLSearchParams({
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    specialty: data.specialty || '',
    practiceType: data.practiceType || '',
    subject: data.subject || '',
    message: data.message || ''
  });

  // 7. Appeler le webhook n8n
  try {
    const response = await fetch(`${webhookUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${webhookToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
