# Mer än bara en chatbot

Två exempel som visar vad vi kan göra mer än att bara få tillbaka text från vår stora språkmodell.

## Structured outputs
Vi kan använda structured outputs för att få tillbaka information i strukturerad JSON för till exempel classificering eller sentiment-analys (klassiska NLP-uppgifter)

## Function calling
Vi kan också använda funktion calling för att låta modellerna ha tillgång till att anropa vår egen kod.
Detta göra att de kan interagera med sin omvärld (ReAct) [Läs mer här om ReAct agents](https://www.ibm.com/think/topics/react-agent).
Detta är den vanligaste typen av agent som används i Cursor, Gemini CLI, Github Copilot etc.
