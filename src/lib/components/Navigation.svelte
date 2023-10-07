<div class="navigation-container">
    <ul class="navigation">
        <li>
            <a href="/">
                Home
            </a>
        </li>
        <li>
            <a href="/about">
                About
            </a>
        </li>
        <li>
            <a href="/items/item1">
                Item 1
            </a>
        </li>
        <li>
            <a href="/items/item2">
                Item 2
            </a>
        </li>
        <li>
            <a href="/items/item3">
                Item 3
            </a>
        </li>
    </ul>
</div>

<style>
    .navigation-container{
        padding: 5px;
        background-color: blanchedalmond;
    }
    .navigation{
        display:flex;
        flex-direction:row;
        list-style: none;
        gap: 10px;
        padding: 0;
        margin: 5px 0;
    }
    .navigation a{
        padding: 5px 10px;
        background-color: brown;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        border: solid 2px black;
        font-size: 14pt;
        font-weight: 600;
        white-space: nowrap;
    }
    .navigation a:hover{
        background-color: blueviolet;
    }
</style>