import requests
from bs4 import BeautifulSoup

EVENTBRITE_URL = "https://www.eventbrite.com.au/d/australia--sydney/events/"

def fetch_events():
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    response = requests.get(EVENTBRITE_URL, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    events = []

    # Find all event cards
    for card in soup.select('section.discover-vertical-event-card'):
        try:
            # The event link
            link_tag = card.select_one('a.event-card-link')
            link = link_tag['href'] if link_tag else None
            if link and link.startswith('/'):
                link = "https://www.eventbrite.com.au" + link

            # Event title (usually in <h3> inside link)
            title_tag = card.select_one('h3')
            if title_tag:
                title = title_tag.get_text(strip=True)
            elif link_tag:
                title = link_tag.get_text(strip=True)
            else:
                title = "No title found"

            # Event details (date, location)
            details_section = card.select_one('.event-card-details')
            p_tags = details_section.find_all('p') if details_section else []

            date = p_tags[0].get_text(strip=True) if len(p_tags) > 0 else ""
            location = p_tags[1].get_text(strip=True) if len(p_tags) > 1 else ""

            # Price (if available)
            price_tag = card.select_one('.DiscoverVerticalEventCard-module__priceWrapper___usWo6 p')
            price = price_tag.get_text(strip=True) if price_tag else ""

            events.append({
                "title": title,
                "link": link,
                "date": date,
                "location": location,
                "price": price
            })
        except Exception as e:
            # You can print(e) here for debugging if needed
            continue
    return events

if __name__ == "__main__":
    events = fetch_events()
    print(f"Found {len(events)} events.")
    for e in events:
        print(e)
