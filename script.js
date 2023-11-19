document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById('search-box');
  const submit = document.getElementById('submit');
  const def = document.querySelector('.def');

  submit.addEventListener('click', () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchBox.value}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        if (data.length > 0) {
          const wordDetails = data[0];
          const meanings = wordDetails.meanings;

          const definitionsHTML = meanings.map((meaning, index) => {
            const partOfSpeech = meaning.partOfSpeech;
            const definition = meaning.definitions[0].definition;
            const example = meaning.definitions[0].example || "";

            return `
              <div class="definition">
                <p id="definition-text">[${partOfSpeech}] ${definition}</p>
                <p id="example">${example}</p>
              </div>
            `;
          }).join('');

          def.innerHTML = `
            <div id="word">
              <h3><b>${searchBox.value}</b></h3>
            </div>
            <div class="word-details">
              ${wordDetails.phonetic ? `<p class="phonetic">${wordDetails.phonetic}</p>` : ''}
            </div>
            <div class="definitions">
              ${definitionsHTML}
            </div>`;
        } else {
          def.innerHTML = "No definitions found.";
        }
      })
      .catch(error => {
        alert('Error fetching data:', error);
      });
  });
});