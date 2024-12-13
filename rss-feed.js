document.addEventListener('DOMContentLoaded', () => {
    const rssFeedUrl = '/rss/scraped_feed.xml'; // Update this path to your RSS feed file location
    const feedContainer = document.getElementById('rss-feed');

    // Fetch the RSS feed
    fetch(rssFeedUrl)
        .then(response => response.text())
        .then(data => {
            // Parse the RSS feed
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const items = xmlDoc.querySelectorAll('item');

            // Loop through each item and display it
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;

                // Create a list item for the feed
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link;
                a.textContent = title;
                a.target = '_blank'; // Open in a new tab
                li.appendChild(a);

                // Append to the container
                feedContainer.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
            feedContainer.innerHTML = '<p>Unable to load RSS feed.</p>';
        });
});
