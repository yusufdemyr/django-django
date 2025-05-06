
document.getElementById('log-form').addEventListener('submit', async function sendMessage(e) {
    e.preventDefault(); // prevent page refresh

    const userInput = document.querySelector('[name="user_input"]').value.trim();
    const responseDiv = document.getElementById('response');
    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
    
    const sourceLang = document.getElementById("source-lang").value;
    const targetLang = document.getElementById("target-lang").value;

    console.log(`Current Lange = ${sourceLang}`)
    console.log(`Target Lang = ${targetLang}`)
    
    responseDiv.innerHTML = '<strong>Loading...</strong>';

    if (!userInput) {
        responseDiv.innerHTML = '<strong>Please enter a question.</strong>';
        return;
    }
    // helper to strip all <think>…</think> blocks
    function stripThinkBlocks(text) {
        return text.replace(/<think>[\s\S]*?<\/think>/g, '');
    }
    // prepare payload and log it
    // model: "deepseek-r1-distill-qwen-7b",
    // model: "gemma-3-4b-it-qat",
    const payload = {
        
        model: "gemma-3-4b-it-qat",
        stream: true,
        messages: [
            {
                "role": "system",
                "content": [
                  "You are a multilingual translation assistant.",
                  "The user will provide you with lines starting with “SourceLang: <source language>” and “TargetLang: <target language>”.",
                  "Translate the text provided in the next line exactly, without adding any extra comments.",
                  "Return only the translation as your response."
                ].join(" ")
              },
              {
                role: "user",
                content: [
                  `SourceLang: ${sourceLang}`,
                  `TargetLang: ${targetLang}`,
                  `Text: ${userInput}`
                ].join("\n")
              }
        ]
        };
        console.log('📤 Payload to /v1/chat/completions:', payload);
    try {
        const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });



        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let resultText = "";

        responseDiv.innerHTML = ""; // Clear previous content

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(line => line.trim().startsWith("data: "));

            for (const line of lines) {
                const jsonStr = line.replace("data: ", "").trim();
                if (jsonStr === "[DONE]") continue;

                try {
                    const json = JSON.parse(jsonStr);
                    const delta = json.choices?.[0]?.delta?.content;
                    if (delta) {
                        for (let char of delta) {
                            resultText += char;
                            responseDiv.innerText = resultText;
                            await new Promise(resolve => setTimeout(resolve, 10)); // slow down here
                        }
                    }
                } catch (err) {
                    console.warn("Parse error:", err, jsonStr);
                }
            }
        }
        // 2) Once streaming is done, strip out all <think>…</think> and replace
        const cleanText = stripThinkBlocks(resultText);
        responseDiv.innerText = cleanText.trim();
        // log when done
        await fetch("/regLog/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
                user_input: userInput,
                model_response: resultText
            })
        }).then(r => r.text()).then(txt => console.log("Log response:", txt));

    } catch (error) {
        console.error("Error:", error);
        responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
});
