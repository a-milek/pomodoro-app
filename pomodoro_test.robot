*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${URL}            https://a-milek.github.io/pomodoro-app/
${START_BUTTON}   xpath://*[@data-testid="start-button"]
${SETTINGS_BUTTON}   xpath://*[@data-testid="settings-button"]
${RESET_BUTTON}   xpath://*[@data-testid="reset-button"]
${MODAL_BUTTON}   xpath://*[@data-testid="modal-button"]
${SAVE_BUTTON}   xpath://*[@data-testid="save-button"]
${TIMER_DISPLAY}  xpath://*[@data-testid="timer-display"]
${FOCUS_INPUT}    xpath://*[@data-testid="input-focus"]
${AMBIENTS_ROLLOUT}    xpath://*[@data-testid="accordion-icon"]
${NEW_EMBED}    xpath://*[@data-testid="new_embed"]
${EMBED_INPUT}    xpath://*[@data-testid="embed-input"]
${ERROR_MESSAGE}    xpath://*[@data-testid="form-error"]
${ADD_EMBED}    xpath://*[@data-testid="add-embed"]
${EMBED_CONTAINER}    xpath://*[@data-testid="embed"]
${BREAK_INPUT}        xpath://*[@data-testid="break-input"] 
${NOTE_BUTTON}        xpath://*[@data-testid="note-button"] 
${NOTE_INPUT}     xpath://*[@data-testid="note-input"] 
${SAVE_NOTE_BUTTON}    xpath://*[@data-testid="save-note-btn"] 
${DELETE_NOTE_BUTTON}    xpath://*[@data-testid="delete-note-btn"] 
${BROWSER}        firefox  # Domyślna przeglądarka




*** Test Cases ***
Ustawienie Notatki localStorage
    [Documentation]   Testuje wprowadzenie zwykłego tekstu do notatki, sprawdzenie za pomocą localstorage
    [Tags]    Note
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible   ${NOTE_INPUT}
    Click Element    ${NOTE_INPUT}
    Input Text    ${NOTE_INPUT}       automatyczny test notatki
    Click Element    ${SAVE_NOTE_BUTTON}
    ${local}=    Execute Javascript    return window.localStorage.getItem("note");
    Should Be Equal As Strings    ${local}    automatyczny test notatki
    Close Browser
Ustawienie Notatki wizualnie
    [Documentation]   Testuje wprowadzenie zwykłego tekstu do notatki, sprawdzenie czy jest widoczna w module
    [Tags]    Note
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible   ${NOTE_INPUT}
    Click Element    ${NOTE_INPUT}
    Input Text    ${NOTE_INPUT}       automatyczny test notatki
    Click Element    ${SAVE_NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible    ${NOTE_INPUT}
    ${note_value}=    Get Value    ${NOTE_INPUT}
    Should Be Equal As Strings    ${note_value}    automatyczny test notatki
    Close Browser

Ustawienie Notatki html
    [Documentation]   Testuje wynik wprowadzenia tagów HTML do notatki 
    [Tags]    Note
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible   ${NOTE_INPUT}
    Click Element    ${NOTE_INPUT}
    Input Text    ${NOTE_INPUT}       <h2 class="description">To jest przykładowy test </p>
    Click Element    ${SAVE_NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible    ${NOTE_INPUT}
    ${note_value}=    Get Value    ${NOTE_INPUT}
    Should Be Equal As Strings    ${note_value}    <h2 class="description">To jest przykładowy test </p>
    Close Browser
Usunięcie Notatki
    [Documentation]   Testuje usunięcie notatki, czy jest usuwana z localstorage oraz widoku
    [Tags]    Note
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible   ${NOTE_INPUT}
    Click Element    ${NOTE_INPUT}
    Input Text    ${NOTE_INPUT}       <h2 class="description">To jest przykładowy test </p>
    Click Element    ${SAVE_NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible    ${NOTE_INPUT}
    Click Element    ${DELETE_NOTE_BUTTON}
    Click Element    ${NOTE_BUTTON}
    Wait Until Element Is Visible   ${NOTE_INPUT}
    Click Element    ${NOTE_INPUT}
    ${note_value}=    Get Value    ${NOTE_INPUT}
    Should Be Equal As Strings    ${note_value}    ${EMPTY}
    Close Browser
Działanie Timera
    [Documentation]   Testuje poprawnoość funkcji odliczania czasu.
    [Tags]    Timer
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${START_BUTTON}
    Click Element     ${START_BUTTON}
    Sleep             1500s
    Sleep             1s
   
    Element Should Be Visible  ${MODAL_BUTTON} 
    Close Browser

Działanie Przycisku Pauzy
    [Documentation]   Testuje podstawową funkcje pauzy.
    [Tags]    Timer
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${START_BUTTON}
    Click Element     ${START_BUTTON}
    Sleep             5s
    Sleep             0.2s
    Click Element     ${START_BUTTON}
    Element Text Should Be   ${TIMER_DISPLAY}   24m 55s
    Close Browser

Działanie Przycisku Reset
    [Documentation]   Testuje podstawową funkcje resetu
    [Tags]    Timer
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${START_BUTTON}
    Click Element     ${START_BUTTON}
    Sleep             5s
    Click Element     ${RESET_BUTTON}
    Element Text Should Be   ${TIMER_DISPLAY}   25m
    Close Browser

Ustawienie Nowej Wartości Sesji
   [Documentation]   Testuje ustawienie nowej wartości sesji
    [Tags]    Settings
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${SETTINGS_BUTTON}
    Click Element     ${SETTINGS_BUTTON} 
    Wait Until Element Is Visible   ${FOCUS_INPUT}
    Wait Until Element Is Enabled   ${FOCUS_INPUT}   timeout=10s
    Click Element     ${FOCUS_INPUT}    
    Press Keys     ${FOCUS_INPUT}    BACKSPACE    BACKSPACE
    Press Keys        ${FOCUS_INPUT}   5  
    Click Element     ${SAVE_BUTTON}
    Wait Until Element Is Visible   ${TIMER_DISPLAY}  
    Element Text Should Be   ${TIMER_DISPLAY}   5m
    Close Browser

Działanie Timera Po Ustawieniu Wartości
    [Documentation]   Testuje ustawienie wartości sesji i sprawdza czy timer odlicza poprawną długość sesji
    [Tags]    Settings
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${SETTINGS_BUTTON}
    Click Element     ${SETTINGS_BUTTON} 
    Wait Until Element Is Visible   ${FOCUS_INPUT}
    Wait Until Element Is Enabled   ${FOCUS_INPUT}   timeout=10s
    Click Element     ${FOCUS_INPUT}    
    Press Keys     ${FOCUS_INPUT}    BACKSPACE    BACKSPACE
    Press Keys        ${FOCUS_INPUT}   2 
    Click Element     ${SAVE_BUTTON}
    Wait Until Element Is Visible   ${TIMER_DISPLAY}  
    Click Element     ${START_BUTTON}
    Sleep             120s
    Sleep             2s
    Element Should Be Visible  ${MODAL_BUTTON} 
    Close Browser

Ustawienie Nowej Wartości Sesji na 0
   [Documentation]   Testuje ustawienie wartości na zero, aplikacja automatycznie powinna ustawić wartość na 1
    [Tags]    Settings
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${SETTINGS_BUTTON}
    Click Element     ${SETTINGS_BUTTON} 
    Wait Until Element Is Visible   ${FOCUS_INPUT}
    Wait Until Element Is Enabled   ${FOCUS_INPUT}   timeout=10s
    Click Element     ${FOCUS_INPUT}    
    Press Keys     ${FOCUS_INPUT}    BACKSPACE    BACKSPACE
    Press Keys        ${FOCUS_INPUT}   0 
    Sleep     1s 
    Click Element     ${BREAK_INPUT}    
    Click Element     ${SAVE_BUTTON}
    Wait Until Element Is Visible   ${TIMER_DISPLAY}  
    Element Text Should Be   ${TIMER_DISPLAY}   1m
    Close Browser

Ustawienie Nowej Wartości Sesji na 999
   [Documentation]   Testuje ustawienie wartości na 999, aplikacja automatycznie powinna ustawić wartość na 100
    [Tags]    Settings
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${SETTINGS_BUTTON}
    Click Element     ${SETTINGS_BUTTON} 
    Wait Until Element Is Visible   ${FOCUS_INPUT}
    Wait Until Element Is Enabled   ${FOCUS_INPUT}   timeout=10s
    Click Element     ${FOCUS_INPUT}    
    Press Keys     ${FOCUS_INPUT}    BACKSPACE    BACKSPACE
    Press Keys        ${FOCUS_INPUT}   999 
    Sleep     1s 
    Click Element     ${BREAK_INPUT}    
    Click Element     ${SAVE_BUTTON}
    Wait Until Element Is Visible   ${TIMER_DISPLAY}  
    Element Text Should Be   ${TIMER_DISPLAY}   1h 40m
    Close Browser

Nieprawidłowy Link do Osadzenia
   [Documentation]   Testuje wprowadzenie nieprawidłowego linku do nowego osadzenia 
    [Tags]    Ambients
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${AMBIENTS_ROLLOUT}
    Click Element    ${AMBIENTS_ROLLOUT}
    Wait Until Element Is Visible   ${NEW_EMBED}
    Click Element    ${NEW_EMBED}
    
    Wait Until Element Is Visible   ${EMBED_INPUT}
    Click Element    ${EMBED_INPUT}
    Input Text        ${EMBED_INPUT}   https://notyoutube.com
    Click Element    ${ADD_EMBED}
    Element Should Contain    ${ERROR_MESSAGE}   Invalid YouTube link
    Close Browser

Prawidłowy Link do Osadzenia
    [Documentation]   Testuje wprowadzenie prawidłowego linku do osadzenia i sprawdza, czy się pojawia nowe osadzenie
    [Tags]    Ambients
    Open Browser      ${URL}    ${BROWSER}
    Wait Until Element Is Visible   ${AMBIENTS_ROLLOUT}
    Click Element    ${AMBIENTS_ROLLOUT}
    Wait Until Element Is Visible   ${NEW_EMBED}
    ${initial_embed_count}=    Get Element Count    ${EMBED_CONTAINER}
    Click Element    ${NEW_EMBED}
    Wait Until Element Is Visible   ${EMBED_INPUT}
    Click Element    ${EMBED_INPUT}
    Input Text        ${EMBED_INPUT}   https://www.youtube.com/watch?v=q1T8tGb_A1M
    Click Element    ${ADD_EMBED}
    ${new_embed_count}=    Get Element Count    ${EMBED_CONTAINER}
    Should Be Equal As Numbers    ${new_embed_count}    ${initial_embed_count + 1}
    Close Browser
















