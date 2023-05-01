import path from "path"; // for absolute path
import fs from "fs"; // overite file
function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;
  //access our data and extrace our data
  //allevent - loop through and identify
  //add emailto email_registered
  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);
  if (!allEvents) {
    return res
      .status(404)
      .json({ status: "404", message: "event data not found" });
  }

  if (method === "POST") {
    const { email, eventId } = req.body;

    if (!email | !email.includes("@")) {
      res.status(422).json({ message: "invalid email" });
      return;
    }

    //first check if email is registered or not.
    const allRegisteredEmailArrays = allEvents.map(
      (ev) => ev.emails_registered
    );
    const allRegisteredEmails = allRegisteredEmailArrays
      .flat()
      .filter((n) => n);

    if (allRegisteredEmails.includes(email)) {
      res
        .status(400)
        .json({ messages: "This email has already been registered" });
    } else {
      const newAllEvents = allEvents.map((ev) => {
        if (ev.id === eventId) {
          return { ...ev, emails_registered: [...ev.emails_registered, email] };
        }
        return ev;
      });

      fs.writeFileSync(
        filePath,
        JSON.stringify({ events_categories, allEvents: newAllEvents })
      );

      res.status(200).json({
        message: `successfull registration ${email} for ${eventId}`,
      });
    }
  }
}
