/** 背景パターン */
export const PatternBackground = () => {
  return (
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {` .cls-background-1 {
        fill: none;
      }

      .cls-background-2 {
        isolation: isolate;
      }

      .cls-background-3 {
        clip-path: url(#clippath-13);
      }

      .cls-background-4 {
        fill: #ddd;
      }

      .cls-background-5 {
        fill: #fff;
      }

      .cls-background-6 {
        mix-blend-mode: overlay;
      }

      .cls-background-7 {
        mix-blend-mode: screen;
      }

      .cls-background-8 {
        fill: #b6b6b6;
      }`}
        </style>
        <clipPath id="clippath-13">
          <rect className="cls-background-1" height="30" width="30" />
        </clipPath>
      </defs>
      <g className="cls-background-2">
        <g id="Layer_1">
          <g>
            <g>
              <g>
                <image
                  height="126"
                  transform="translate(-.07 -.17) scale(.24)"
                  width="126"
                  xlinkHref="data:image/png;base64,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"
                />
                <g className="cls-background-6">
                  <image
                    height="126"
                    transform="translate(-.07 -.17) scale(.24)"
                    width="126"
                    xlinkHref="data:image/png;base64,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"
                  />
                </g>
              </g>
              <g className="cls-background-7">
                <image
                  height="126"
                  transform="translate(-.07 -.17) scale(.24)"
                  width="126"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAACXBIWXMAAC4jAAAuIwF4pT92AAAYTklEQVR4nM1dWZbjOA6EbDn7on2RPnZlptPz0RWqUDgAgpI9M3jPT+IqEoGN1OLln3/+eSzLEqD7/R5Kj8djl75er/F4PFp1j+Yfrdfti+fM1M1HOjuO6vCP81x5t86obFmW+Pvvv5f1er3uJnO5XHYD/P7+tky4Xq8b+KD7/d4G93K5xOPxiJ+fH1t/WZatzIHE5bOEvly/GGeVPxJA9Jsdf35+4nK5WJB+fn5iWZatXMFE+fV6LYF2echf13V9mhjTx8fHLn2/3zfB4DaPx2PLRx5bggz0y+ViLQYmVgmGXi+bQ0ZnwK+u83g8du0VcG6v4KIcRwUXoN/v90PgR0Sst9vtaRJuYmA+LjKqiwlV5WAGBA8TVW2CNcKEM6ZXZtuRAjsDvl7TzRP5DLj2w3PWdsuyxPf39w4wHmMGfuUOIiKezLvTOhDqQsMwINDlctlp5QgELofWK5jMUOc3Xd2utqsAHQV/ZBVGeR3CmAAyrscWICI2BVLA+biqX85MNEsy2nx8fOzyYfpZ07U9zlEP5SzdoMrfV6SMGJFaFjcWHnvVh/aj7Zg3WofNu/p8HAG6K1uWJT4/PzfN13LQpuk6GaRVKL6/v3d5ThhYYDA5DtwYdEyEGceTcD69a8Kdz3dz5D5HWt8J4lw/Kogw9S5Q43oK/gh0raeWPELMuwOSj+zTWRvcEb6a++BgbzeI3/UQ1bIfxMSZUeoWqnPNY1INd3lVDMGUuRWdv/ap8Q2XR0RqCbP5ORyWZdlZ4FWBqY6sOW4yfBE9j4idJXCDZe13xOUZs/Q8K68oEwbQjK/u1q2Es3Md7aca/3q9Xp+WEZ0j++QK7OycI9NZ4v46QjAKFh0juwJyRAAywXYWxrWNyH0+L/UyWi+Xy858doFXTQL4zKzKIkT8Meu8YhiZXA181Kx2TL/m6TU7YDvqCADSozgl01Rep0c8g+/2AbTPXfSuwRZXzEDXtqz5XI+J/bYKDk+yAt9RB3A3h+x8JoBz43Pno3LuS+fmxu/W+UwsHBvoThKQ55ZrOCpwDkDVcjVfVVtHfF0HkvaFNi4yP6rNOh53PiqbLY/I9weqeTIxT9ds+cUXUs2vQHcAVj7YEW+/ZtE0p4+A7wK9rN8RdbXXuaLsfOTT1VWBeKmXjWPVtWym1ar1jsEZ+G7ZMdPWBSyV6df+Nc+Zb8fgqqzSzkrrR2lVLowdpLGALoHdOl/H9aTpDvTH47FbS8+aR9ZcFz1324JmzLSzFCNrM1NnVFYJieZn59XOIqxwNh638bVq9DpipNtc6dJoHd5pOzLZeg5Sl8TUAVnrVtSxBmfPO9fMLMq2Tp9ZYzMDs6CrMuGjiLPqr9qPrwSXr6WbTBUzZwRipk3HFWRmvyLHH22zLsuSBk7VOYjbKrgZQdA6zNb+eDOp69tHpII968KOCIbSjHbPaLzby1jZx86An0Xk6kOy3/V6tevyI0IzYrZOXAM5Pde44xXuoGozq/WjtnzuYqGdT8egdKmmIGMyjkZPuzAjGLyuRmLweu+e+9Xzs6R7A+9yB6CRX67qqhA4odhpug7Ybc92J+NAce2zeo4UVJjizARWgd1ZYl513UEn7uj49BHoDvAd6E7TdWDZsmn0Y5PP1kNptNHjtAv9Q2iypVmH2WdpZAmOLv0icpOfgc977zqmzbxX62YVgmzJMyJt57TOMUop8/ujzRbXf0bdQLYCthsTzFzXjd8B6uZtNd1d2ElUVwsd4TrZc3BsqqtJurxlWdKbNeyqWPpHLqsTyIIn3bogbc/5WZ6Wd86zvD/PPxtm8sArYLvR86isCs6c6eZ8Xsq5vrWNW6szc3RZOAI5Wwm46B1laJ/VHfHuqHCs7sIVQUvcxbO2rt8MzErjRz6zG9hVeVV+RUeARznmoHlKVdwyGhvT2pVA7kB9NN9JOzrYjsa7+ioELrAbWQvN0/llrqCj5XzeAajim5KWqbanmt4Be1SmprKzRh/l6Rq+mqAKhFuG6rU6Y6iEgPlwRAiO8CSzYA7sqs7m0x3AR0wJ99WJBzJygpUxxuWz9YHbqMCeEYyOEMy4zBm+dus6ZWlpuqbVzFfpbMAdieZ8PHbtTHUG1OPxZ7dvdGdtRuu6QuBWEh3AOn49o5EbeNJ0BxYHRa8QDGcKXRuUoR6/Fu3aa30GyL1F40hBdX4Qb+92+sCzB9oPb1LNkgbQI8us9bju6ibIJpHTHarqqlYwo1RTtYzHmI05O4/wDxuMgOZzfVRc61TzcdaJLdmId52o3ykD5zOt2aQzhmhHOiCVuEz71eyNAGFJr57Td3n6uFc1v+oc83BWZxZ4tWTZr3pH39FI2yN+gz4Cd+aoAtAZsGNOJgzcrwO/ElDNU0FQoeMyFcDHw7uc0dgrgCvN796fyPphGoJeMdGlq2CkMkUd4JUR3H70rL6bC5vYkUBrPzqmkQBlc9Ynj7hcA0SnxRlVSrZ+fX3ZDmfT1aC6fseZfWWeA//xeDyZSe53lMcBn47VCU5X+53wqhDxRpQGaxkfR/we0ZNPzzpz5rUaFIPCaWdCR76Kl0batzIXee6rDwqUnrNmZa4jA101vPvYNy8recwu0HOrHJ2f453SWn15wvmjrPMRzQQhWQSLOhngPC59V/52u23LrgwwTqv2Xy6X+P7+LgHPwFe/zEA6E565EOWL9uf8vrMcKybCTNK3I9wLEU7ruuQCvaoeT1JvqMycV1qelfNHG7qAa3ukweusrVoDB6IKHvfXeUAlImLVZ9Q0uHBpNUVdszJyC84ku7pHQcc1OC8D3ZVh3iPws7zr9RpfX1/DSJxfAtV8bessSaXlERHr5+dnPB77r0boCw3uBQe9qeGA0UhVyWmylnE/GuhkwGZpPIGLsplXs9GeNS177DvT+qwdpx2wag1UUbkfvSPoaNP0r6+vp0ALQDgf5LSysy6vNNkJkgrOuq72tmu1LtU8Nb3ue3fZEedqcjU/SzNo7qivi/MRfbCbU8uL+IMFQ/tYf/369e/Jun+Ihr/txi++szXILEMGvgOySmfAO8K3cDpveCiACr4TkEqLwQvns915Nj9WMJy7FxAZbOaL69tdZ9ucgbSCAfg0CD+UgMFE7L+O5C7uBjIaTFU/Exgl/RChEkw0mMdHFl73ydPM5Cr4EKAKdNZY1m4WoOw+BY8Z52p53Tnmt2k6vhyJwICZx1+JxAA4eu9qejYgB2wmsZ1AjyeIOWhfIzOO9vpt3HVdA3FQRwD0uzr8VA/ONba43++7r2SqQCBfV1XoS+/mKc9WfBcOPl01HZoBoFXT1RI4ADLqAq55+m27EfGyiwUyM92cd7vddoyGQlSAsz9l8CMi/vrrr/j6+toBrmPAkQUEvFaAXVtuz2MHrd/f3/H9/R3rum53o5ZlidvttnXMARQzDnkjH61lGaiuHy3DeWd5V40pM/GVAChTR0Dzj9frDCYHXXrUvHVdtyWfUzpgw+fshrdADpp+v9+3CqzdkGr4GF7asRli5qqPz0CY0W73mwFZSX3/yNzzEfzJPqc2+mF3kJWINd+Zfxx1E43NfOc8gjT9drttUfr9ft80Hw0ALiQNUqafo2TBYWZlfr7y75mWO1On1xkJAQTdva/XBZ+3aruAOyGBQoHXuhzTI7Seny9grR8Bv2k6LgzAMBHkcTAEBoJpLI3O5yv4PAEHSBYfqIZzGtdRS9PpH/PEnDLgNc/5bVdegf7z8xO3220LwJx261Hn//Pzs1kOZ/oVg52m81oX5o8lixnGYMPkMcNVQh3TM7PN5biO+6nQqABU11YwM/BdnYg/W6oOfKf9LAjX63VbATCPABJca2XyVQCg+brU1uMGOjQdheu67jSdTQkieAwAoGhamZ6Z9RHo1a/awRuZebVoCqoujxR8BpF/qKtRuwIP7cbPaSiEil3B5XKJz89POzcF323wRPx+iAI+nL8ghXV7xL9+fF3X7eLsClA/Iv/grzKcJ5DRSMuZORngTsgwLhauyoxHPH9MUefBgDNADnxup1bLnQNAHiPHW3AJ/EOcBcHReaww7ZD46/W603Sk0RkuGhFPYKv/YNOmDOc0GOnMt/PhCrwDNzvXmzrutrEeMRZ9tFm/t8NKoALB38FFYMzz4JhJdxN5BQULxeRiFBCw5U2iFZLEPlmf+lAJ5++NKnjKMBYGtQKZCca1HLgurZPv5jFwOu7q3j3n8XYpzxkKouZeH+7QuaoFwDicFXE8c30ivfl0fXJG14IYqNtwYD9fgTYip+3ddBUrdPMcmDovDci4jgvYkJ9pP2s6a7YKg0brvC3u/j7NCYOSfVxKtUzf/WazGPH8L0v66wCPATsNruqrEPAY9TzLU+EB41gg+JzruBctmQ9q+tn361y7ArD5ZgraXJuMVv5PEDYpLLm8TODOnc/uXDQjZbKWadoJR0fTRxqvAEc8r0S4PfNL/bHzt9zGraPRzvn5zOdrwFfRqpKnPtj5Y2fOnBa4SXdo1ty7djNHbq9Cp9aKtZbn67RcYwP17Vh6qdvATif3jzHpliqPrVoNMT297OD8Vnbu2ui5BiYjoBzN+HUnEF0/r66Ix55pUEeoXR12kcpzBl+XaxH1X3WAdAeVr7cyOA4wN1lXT3eNcEE1RZk0Ot+vWoVz5wuPaLcC2vHpmbBVlFlKXjExr3izRl+cdDx1GGGphlvmvMJ4At1peyYAlVlXAnNcfMDlVbCFc2X2UbOuxwpsPddrzxKEl6/LpPcuIvxS2fXL57xOB63o2JngDrMy/woa+WDnKzONfzdVZrxqE9GLmrUdWxrHe95xXJblaaXAy0L8sLGGNN8l3dbpfAH+cX4mENUPlMUJGfivIBWgkdDMAsZtMtfAee4a6mdVs/kGCYjvbVwul90Wq/arSznm8ZqBygKAzRmntaO2uuWozKgExjGvQ1n9jjA4F5aVufwMfCcAquV6L4EFgHf+YOZx0wZ19MvaKIdwbP1V5twNsgInY462Vwa5vl+h+TN9ZEHrq66duTmX54JdvWegZU4ZQRrtr7ihcr1e7Q8ShHM2/7jb4yaYTbhigA66EhKlo0KSBaivImgzp/nImp0tPXHkvRO1rCB9kBX79jufzoDzOQ+STbSa/OyHCYxiAr5OB/wsfzbY65j2mTxHDHjmtjKfzm35yE/aAFzlG9+V4742n+603OVFxPZAhdP80Q/tMyHgQVfgz1BHEEZ7EVla8yu/nmk7p1mTua77f3vS2B34aLssf55+AvjMiwsenlCTrj/UGwGQrftHmu6Y4WgG/FfEBRV1AjulbEyjeTk32ilz5evtdovb7RYfHx+bFCEP0SCnUQ5/jp0lvv3K6YjY0izR/NZMZf6dCeY8TrvoHP1neWfMN/fTKVczC2LtZXPPStO9jc1bt2inm2vrx8fHZr6XZdnABWkaYIMYXE5vpqSILEf+utpuzcgtx6o81/5IngPfAQ6eZOt8EIOvN73AG/cpVPAMZp3nuwN9XdedZiMNCeQ0NNlpOi7GaUxANb3y7RzQMAPP+HdHuvlxlEY+e9RW+2GBWJb98wysufDd+vw++gF+GvCtMOvI4JceoPmVJjO4mmaQOV0xRcE/Ql3z3u1rlKeAZxo/mre7lo5dd+pYKPQazH/ue/Pp/C4bgjbWdPXZ/HQsazLK1cSrZqvZP0MjhmbmnY8z18rSI8AzgdN24DtrNJ/jumoRgIW7HbsDfaTpvAEDqao0O/PhzjTrmrSqfyQirmgW7Jk+nLnPtFCDSbag1Sro8fB/U877JO4Zugjy6dBOaDrS2M3hNIDFJgELCCwDD443dlDOE4/YR6XqDrI8Zv4IeNW2Ud0j5MDLInen9VrG7VzghzJ9rk4DRn2aeYVmM5Cq6axxeIVZfXrm41nzIQDKKDfxs9QRBK47k98pr/zzzDW0LfOSFcJZAqdQEbRkA7h4/Zjfa9M0Aw/LgLRqMgPNfkcnhONRP+80R4HvLLNmqGpfBWadPjUOYUAj9lF8xB8Nh7V2tFuyZZrsNB1pkKZVkxVg3pLNGOJMuBu8tuOyyoxm/RwhZ5Krcbkyl68BGysMFIlfxkA93jfJ/txgC+SgydB0mGX10arZSKNzWAZNO2lVs67lyoSOGc7AdnUqmhWICnyUu7jCjcXxxfXF3wRwY3B35SJ++3TOUE3XXTGn6Uyq6W7d7iam5Y4hXbAqzec8R2djio52Z0AyZYLsfHvmLkFPn4tjTY/486EBgK2azOmI2Gm2DkKXYTzYSuJdsDJDFdCj/l5h8kFHrIxrw2Nn3ro62FWtlGf9+PjYFfLSKCJ2ryw7n67RutNmd+R6Ckjl12aoC/S7aQZ8N/eMvxHPW8mqsA6P3ZItYv9JEfbxIE3rGxf6mg5f0L1LXk1wxKAuHdXeVwvLrLtSxXC8AxbOzENBn3y6anoVfaOcpcuVZ5PiASodNeXvpHeNqQK/KnPjydqygHBgHUGgd7Whu/sFYu2u6Ij//X+navwjsFzdLNDNrGZWZ3WZI6r+DUKFQh/3cfWVupH2EXJmcFS/G3x1qQJrVD5a1naOK39FSgl5qq0OyNG6WNO6ttR+dELZGI/QrCV5t+upQNbVjgbas8eI3y87gHQJgAs5kJ0ZqTZPMrMzA/KrBWBmKXUG+JHJ7h5dJH4Y9A5wrkx3mGbPHUOOlL1SAF6l0R1//goQD4GOCysoehxNMNtMyM6ZumBmZbMCMNqPzwDLylz+yDLMav+sRajqbJreAZcHV7XpWIWMAbMC0M13NBLCd/jxym+7eq8Wjgj6K22n3Ue0/ihlgaFLZ5r1KqoYPcqfadu9dqfvSphYGCJ+gw6G6XGWsn7O9l+tLM5qY6d9B8hZ8CtNnNHgI3n2r7RBI5BeJSRV/owFOEtdLXWMPJI+C+QRYYiIuOBmRsQexCpvNOiZSBKE/t/lPo7QDOBqQjvp6ngmLxOGTdMjai0flR9Zv3a0tZv3LuqY6yPtMrAyhXilMICmzbvLy75yOPLlZ4B91S6Zbhy581kT7/KOgjlTt5u3HgF5Nq9Ls0JQreNfSSpgnfNsXF1Nf6f535n37HwE5MyaeKb92fx3CMEs+K8CvNNPJy9CvhgZ0ffvrzp/FeBKR3zwiFlHGJ+VI31Es2eu766x6vNUM6BnT2EeOa/yqnxHRzT8iN/m/FdF3dmxEoZR/3q+fRBYC45q67L4ffisvqs3U6Z01qTPgP+/BrwCvrrmyt8dBemrrWc1dWazpdOf5jth/W+Cr3kdcKuyMwFex62s+jQlaz4/4MjlOHa0szL9R025Exyd2DvBd+WzzH8H0NzWXedJ0x3x33RFPAPXAT0Df0bjAWqnTjaOs+Azjcxst+67AM+AB5Wgg/iZOGb+jB9m5kNgRkByu5llYQb+GeDPADxyBWeAnu0jIgG9mlhHc0bCcERoXPnI745ohlFH257V7O51Z+hpycakrywpsennvIrURTjXMWrHed1Jd5nYqXNEWCq/2xn3K4V5xScq3GPB+HLRsjy/BIFyWIojjzo/Ho+nD9dX9at+Z5mZ0SsAHvWl5a+ibn/bX3Qx89kEoyMF15Uvy/OnwCJ6UXr2SHSnH44Nuib/jC/NxnC0r7Pgz7bf+fRlWZ7eeATBlHK5Pg+/LEtb89Gn9n822j7bvtPuFYGXu97smI/OcXVfK2BQ+bVkHbTTzrOaj/aoM/L5EBQVGOQd8fndIKxznLlep123TkUr/5uPdgifDZ+eaXU1Adb8iHz9npG+bqvEgGcWqrpOF5wzAqB5HcC7buoIbdE7NJ59Ng+Qwc/22qtzDhhn99JdDMHnCnyl+drHLB3R8KzsKPhn6QJtxkdr8H/cIPW72KVza+3O+eg/xWbSM8LToVmtnwH6iF9/V7C38tf/1QThs9/ONKFcv0zhLIObgP7VJ9epbv6wBmcv87nJVlo2YlKXzpj9mfIjY2Ja8X+f7oNA9/t986n4DImafP6XAY0H0IfGBAy6gq8mW798wQIy+mO/M4zptjkCtKbfofVVnS2Qw+ehnU9nBuNToOgYv8/Pz629gsHayTEB6rC7cNF+toGjVqUD/qu0papX1ddxvht8R09/pZ0tdQAKfzjeEX+kFgNT7XT5oygcY3AuYAR+RiOh6JpeFfCszbu03SlXRSt/AF4Hr58EzTRf22k556v5huZrfsSf78q6O3Jughn4Fbhd4Fybbt/Z9br9zoyn85WNzac78Nin6+dEeam3LM8+X302+3yn2fqRQnYxLBjOIsyC37EEr3IDs8DPns+2iyCfDvDwt07K3F+/fu3KVfPZp7ty/oM4HQiup/4ehLHpl6y6989Hd+OOAOzIXUfd5ehaR0DsEtr9B13qANmIr5eTAAAAAElFTkSuQmCC"
                />
                <g className="cls-background-6">
                  <image
                    height="126"
                    transform="translate(-.07 -.17) scale(.24)"
                    width="126"
                    xlinkHref="data:image/png;base64,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"
                  />
                </g>
              </g>
            </g>
            <g className="cls-background-6">
              <g className="cls-background-3">
                <g>
                  <polygon
                    className="cls-background-5"
                    points="30.99 1.61 30.02 -.06 29.05 1.61 30.99 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.05 1.61 28.08 -.06 27.11 1.61 29.05 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.11 1.61 26.14 -.06 25.17 1.61 27.11 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.17 1.61 24.2 -.06 23.23 1.61 25.17 1.61"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.23 1.61 22.26 -.06 21.29 1.61 23.23 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.29 1.61 20.33 -.06 19.36 1.61 21.29 1.61"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.36 1.61 18.39 -.06 17.42 1.61 19.36 1.61"
                  />
                  <polygon
                    className="cls-background-5"
                    points="17.42 1.61 16.45 -.06 15.48 1.61 17.42 1.61"
                  />
                  <polygon
                    className="cls-background-8"
                    points="15.48 1.61 14.51 -.06 13.54 1.61 15.48 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.54 1.61 12.57 -.06 11.6 1.61 13.54 1.61"
                  />
                  <polygon
                    className="cls-background-8"
                    points="11.6 1.61 10.63 -.06 9.66 1.61 11.6 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.66 1.61 8.69 -.06 7.72 1.61 9.66 1.61"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.72 1.61 6.75 -.06 5.78 1.61 7.72 1.61"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.78 1.61 4.81 -.06 3.85 1.61 5.78 1.61"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.85 1.61 2.87 -.06 1.91 1.61 3.85 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.91 1.61 .94 -.06 -.03 1.61 1.91 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-1 -.06 -.03 1.61 .94 -.06 -1 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".94 -.06 1.91 1.61 2.87 -.06 .94 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.87 -.06 3.85 1.61 4.81 -.06 2.87 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.81 -.06 5.78 1.61 6.75 -.06 4.81 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.75 -.06 7.72 1.61 8.69 -.06 6.75 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.69 -.06 9.66 1.61 10.63 -.06 8.69 -.06"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.63 -.06 11.6 1.61 12.57 -.06 10.63 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.57 -.06 13.54 1.61 14.51 -.06 12.57 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="14.51 -.06 15.48 1.61 16.45 -.06 14.51 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="16.45 -.06 17.42 1.61 18.39 -.06 16.45 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 -.06 19.36 1.61 20.33 -.06 18.39 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.33 -.06 21.29 1.61 22.26 -.06 20.33 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.26 -.06 23.23 1.61 24.2 -.06 22.26 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.2 -.06 25.17 1.61 26.14 -.06 24.2 -.06"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.14 -.06 27.11 1.61 28.08 -.06 26.14 -.06"
                  />
                  <polygon
                    className="cls-background-5"
                    points="28.08 -.06 29.05 1.61 30.02 -.06 28.08 -.06"
                  />
                  <polygon
                    className="cls-background-8"
                    points="30.02 3.28 29.05 1.61 28.08 3.28 30.02 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.08 3.28 27.11 1.61 26.14 3.28 28.08 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="26.14 3.28 25.17 1.61 24.21 3.28 26.14 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="24.21 3.28 23.24 1.61 22.27 3.28 24.21 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.27 3.28 21.3 1.61 20.33 3.28 22.27 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.33 3.28 19.36 1.61 18.39 3.28 20.33 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.39 3.28 17.42 1.61 16.45 3.28 18.39 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="16.45 3.28 15.48 1.61 14.51 3.28 16.45 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.51 3.28 13.54 1.61 12.57 3.28 14.51 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="12.57 3.28 11.6 1.61 10.63 3.28 12.57 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.63 3.28 9.66 1.61 8.69 3.28 10.63 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.69 3.28 7.72 1.61 6.75 3.28 8.69 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.75 3.28 5.79 1.61 4.82 3.28 6.75 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.82 3.28 3.85 1.61 2.88 3.28 4.82 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.88 3.28 1.91 1.61 .94 3.28 2.88 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".94 3.28 -.03 1.61 -1 3.28 .94 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-.03 1.61 .94 3.28 1.91 1.61 -.03 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.91 1.61 2.88 3.28 3.85 1.61 1.91 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="3.85 1.61 4.82 3.28 5.79 1.61 3.85 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.79 1.61 6.75 3.28 7.72 1.61 5.79 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.72 1.61 8.69 3.28 9.66 1.61 7.72 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.66 1.61 10.63 3.28 11.6 1.61 9.66 1.61"
                  />
                  <polygon
                    className="cls-background-5"
                    points="11.6 1.61 12.57 3.28 13.54 1.61 11.6 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.54 1.61 14.51 3.28 15.48 1.61 13.54 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.48 1.61 16.45 3.28 17.42 1.61 15.48 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.42 1.61 18.39 3.28 19.36 1.61 17.42 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.36 1.61 20.33 3.28 21.3 1.61 19.36 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.3 1.61 22.27 3.28 23.24 1.61 21.3 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 1.61 24.21 3.28 25.17 1.61 23.24 1.61"
                  />
                  <polygon
                    className="cls-background-5"
                    points="25.17 1.61 26.14 3.28 27.11 1.61 25.17 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.11 1.61 28.08 3.28 29.05 1.61 27.11 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.05 1.61 30.02 3.28 30.99 1.61 29.05 1.61"
                  />
                  <polygon
                    className="cls-background-4"
                    points="31 4.95 30.03 3.28 29.06 4.95 31 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="29.06 4.95 28.09 3.28 27.12 4.95 29.06 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.12 4.95 26.15 3.28 25.18 4.95 27.12 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 4.95 24.21 3.28 23.24 4.95 25.18 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 4.95 22.27 3.28 21.3 4.95 23.24 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="21.3 4.95 20.33 3.28 19.36 4.95 21.3 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.36 4.95 18.39 3.28 17.42 4.95 19.36 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.42 4.95 16.46 3.28 15.49 4.95 17.42 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 4.95 14.52 3.28 13.55 4.95 15.49 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 4.95 12.58 3.28 11.61 4.95 13.55 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 4.95 10.64 3.28 9.67 4.95 11.61 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="9.67 4.95 8.7 3.28 7.73 4.95 9.67 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="7.73 4.95 6.76 3.28 5.79 4.95 7.73 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.79 4.95 4.82 3.28 3.85 4.95 5.79 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.85 4.95 2.88 3.28 1.91 4.95 3.85 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="1.91 4.95 .94 3.28 -.03 4.95 1.91 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-1 3.28 -.03 4.95 .94 3.28 -1 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".94 3.28 1.91 4.95 2.88 3.28 .94 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="2.88 3.28 3.85 4.95 4.82 3.28 2.88 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.82 3.28 5.79 4.95 6.76 3.28 4.82 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.76 3.28 7.73 4.95 8.7 3.28 6.76 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.7 3.28 9.67 4.95 10.64 3.28 8.7 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.64 3.28 11.61 4.95 12.58 3.28 10.64 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 3.28 13.55 4.95 14.52 3.28 12.58 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 3.28 15.49 4.95 16.46 3.28 14.52 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 3.28 17.42 4.95 18.39 3.28 16.46 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.39 3.28 19.36 4.95 20.33 3.28 18.39 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="20.33 3.28 21.3 4.95 22.27 3.28 20.33 3.28"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.27 3.28 23.24 4.95 24.21 3.28 22.27 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.21 3.28 25.18 4.95 26.15 3.28 24.21 3.28"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.15 3.28 27.12 4.95 28.09 3.28 26.15 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="28.09 3.28 29.06 4.95 30.03 3.28 28.09 3.28"
                  />
                  <polygon
                    className="cls-background-8"
                    points="30.02 6.62 29.05 4.95 28.08 6.62 30.02 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="28.08 6.62 27.11 4.95 26.14 6.62 28.08 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.14 6.62 25.17 4.95 24.2 6.62 26.14 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.2 6.62 23.23 4.95 22.26 6.62 24.2 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.26 6.62 21.29 4.95 20.32 6.62 22.26 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.32 6.62 19.35 4.95 18.39 6.62 20.32 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 6.62 17.42 4.95 16.45 6.62 18.39 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="16.45 6.62 15.48 4.95 14.51 6.62 16.45 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="14.51 6.62 13.54 4.95 12.57 6.62 14.51 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.57 6.62 11.6 4.95 10.63 6.62 12.57 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.63 6.62 9.66 4.95 8.69 6.62 10.63 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.69 6.62 7.72 4.95 6.75 6.62 8.69 6.62"
                  />
                  <polygon
                    className="cls-background-8"
                    points="6.75 6.62 5.78 4.95 4.81 6.62 6.75 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.81 6.62 3.84 4.95 2.87 6.62 4.81 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.87 6.62 1.9 4.95 .94 6.62 2.87 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".94 6.62 -.03 4.95 -1 6.62 .94 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-.03 4.95 .94 6.62 1.9 4.95 -.03 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.9 4.95 2.87 6.62 3.84 4.95 1.9 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.84 4.95 4.81 6.62 5.78 4.95 3.84 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.78 4.95 6.75 6.62 7.72 4.95 5.78 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.72 4.95 8.69 6.62 9.66 4.95 7.72 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.66 4.95 10.63 6.62 11.6 4.95 9.66 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.6 4.95 12.57 6.62 13.54 4.95 11.6 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.54 4.95 14.51 6.62 15.48 4.95 13.54 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="15.48 4.95 16.45 6.62 17.42 4.95 15.48 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.42 4.95 18.39 6.62 19.35 4.95 17.42 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.35 4.95 20.32 6.62 21.29 4.95 19.35 4.95"
                  />
                  <polygon
                    className="cls-background-5"
                    points="21.29 4.95 22.26 6.62 23.23 4.95 21.29 4.95"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.23 4.95 24.2 6.62 25.17 4.95 23.23 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.17 4.95 26.14 6.62 27.11 4.95 25.17 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.11 4.95 28.08 6.62 29.05 4.95 27.11 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.05 4.95 30.02 6.62 30.99 4.95 29.05 4.95"
                  />
                  <polygon
                    className="cls-background-4"
                    points="30.99 8.29 30.02 6.62 29.05 8.29 30.99 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.05 8.29 28.08 6.62 27.12 8.29 29.05 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.12 8.29 26.15 6.62 25.18 8.29 27.12 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 8.29 24.21 6.62 23.24 8.29 25.18 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="23.24 8.29 22.27 6.62 21.3 8.29 23.24 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="21.3 8.29 20.33 6.62 19.36 8.29 21.3 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="19.36 8.29 18.39 6.62 17.42 8.29 19.36 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.42 8.29 16.45 6.62 15.48 8.29 17.42 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.48 8.29 14.51 6.62 13.54 8.29 15.48 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="13.54 8.29 12.57 6.62 11.6 8.29 13.54 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.6 8.29 10.63 6.62 9.67 8.29 11.6 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.67 8.29 8.7 6.62 7.73 8.29 9.67 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.73 8.29 6.76 6.62 5.79 8.29 7.73 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.79 8.29 4.82 6.62 3.85 8.29 5.79 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="3.85 8.29 2.88 6.62 1.91 8.29 3.85 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="1.91 8.29 .94 6.62 -.03 8.29 1.91 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-1 6.62 -.03 8.29 .94 6.62 -1 6.62"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".94 6.62 1.91 8.29 2.88 6.62 .94 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="2.88 6.62 3.85 8.29 4.82 6.62 2.88 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.82 6.62 5.79 8.29 6.76 6.62 4.82 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.76 6.62 7.73 8.29 8.7 6.62 6.76 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.7 6.62 9.67 8.29 10.63 6.62 8.7 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.63 6.62 11.6 8.29 12.57 6.62 10.63 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.57 6.62 13.54 8.29 14.51 6.62 12.57 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.51 6.62 15.48 8.29 16.45 6.62 14.51 6.62"
                  />
                  <polygon
                    className="cls-background-8"
                    points="16.45 6.62 17.42 8.29 18.39 6.62 16.45 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 6.62 19.36 8.29 20.33 6.62 18.39 6.62"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.33 6.62 21.3 8.29 22.27 6.62 20.33 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.27 6.62 23.24 8.29 24.21 6.62 22.27 6.62"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.21 6.62 25.18 8.29 26.15 6.62 24.21 6.62"
                  />
                  <polygon
                    className="cls-background-5"
                    points="26.15 6.62 27.12 8.29 28.08 6.62 26.15 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.08 6.62 29.05 8.29 30.02 6.62 28.08 6.62"
                  />
                  <polygon
                    className="cls-background-4"
                    points="30.03 9.96 29.06 8.29 28.09 9.96 30.03 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 9.96 27.12 8.29 26.15 9.96 28.09 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.15 9.96 25.18 8.29 24.21 9.96 26.15 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.21 9.96 23.24 8.29 22.27 9.96 24.21 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.27 9.96 21.3 8.29 20.33 9.96 22.27 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.33 9.96 19.36 8.29 18.39 9.96 20.33 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 9.96 17.42 8.29 16.45 9.96 18.39 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.45 9.96 15.48 8.29 14.51 9.96 16.45 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="14.51 9.96 13.54 8.29 12.58 9.96 14.51 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.58 9.96 11.61 8.29 10.64 9.96 12.58 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.64 9.96 9.67 8.29 8.7 9.96 10.64 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="8.7 9.96 7.73 8.29 6.76 9.96 8.7 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.76 9.96 5.79 8.29 4.82 9.96 6.76 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.82 9.96 3.85 8.29 2.88 9.96 4.82 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.88 9.96 1.91 8.29 .94 9.96 2.88 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".94 9.96 -.03 8.29 -1 9.96 .94 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-.03 8.29 .94 9.96 1.91 8.29 -.03 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.91 8.29 2.88 9.96 3.85 8.29 1.91 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="3.85 8.29 4.82 9.96 5.79 8.29 3.85 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.79 8.29 6.76 9.96 7.73 8.29 5.79 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.73 8.29 8.7 9.96 9.67 8.29 7.73 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.67 8.29 10.64 9.96 11.61 8.29 9.67 8.29"
                  />
                  <polygon
                    className="cls-background-5"
                    points="11.61 8.29 12.58 9.96 13.54 8.29 11.61 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="13.54 8.29 14.51 9.96 15.48 8.29 13.54 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="15.48 8.29 16.45 9.96 17.42 8.29 15.48 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.42 8.29 18.39 9.96 19.36 8.29 17.42 8.29"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.36 8.29 20.33 9.96 21.3 8.29 19.36 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.3 8.29 22.27 9.96 23.24 8.29 21.3 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 8.29 24.21 9.96 25.18 8.29 23.24 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 8.29 26.15 9.96 27.12 8.29 25.18 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.12 8.29 28.09 9.96 29.06 8.29 27.12 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.06 8.29 30.03 9.96 30.99 8.29 29.06 8.29"
                  />
                  <polygon
                    className="cls-background-4"
                    points="31 11.63 30.03 9.96 29.06 11.63 31 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.06 11.63 28.09 9.96 27.12 11.63 29.06 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="27.12 11.63 26.15 9.96 25.18 11.63 27.12 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="25.18 11.63 24.21 9.96 23.24 11.63 25.18 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 11.63 22.28 9.96 21.31 11.63 23.24 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 11.63 20.34 9.96 19.37 11.63 21.31 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.37 11.63 18.4 9.96 17.43 11.63 19.37 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.43 11.63 16.46 9.96 15.49 11.63 17.43 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 11.63 14.52 9.96 13.55 11.63 15.49 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 11.63 12.58 9.96 11.61 11.63 13.55 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="11.61 11.63 10.64 9.96 9.67 11.63 11.61 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.67 11.63 8.7 9.96 7.73 11.63 9.67 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.73 11.63 6.76 9.96 5.79 11.63 7.73 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.79 11.63 4.83 9.96 3.86 11.63 5.79 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="3.86 11.63 2.89 9.96 1.92 11.63 3.86 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="1.92 11.63 .95 9.96 -.02 11.63 1.92 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-.99 9.96 -.02 11.63 .95 9.96 -.99 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".95 9.96 1.92 11.63 2.89 9.96 .95 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.89 9.96 3.86 11.63 4.83 9.96 2.89 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="4.83 9.96 5.79 11.63 6.76 9.96 4.83 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.76 9.96 7.73 11.63 8.7 9.96 6.76 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.7 9.96 9.67 11.63 10.64 9.96 8.7 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.64 9.96 11.61 11.63 12.58 9.96 10.64 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 9.96 13.55 11.63 14.52 9.96 12.58 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 9.96 15.49 11.63 16.46 9.96 14.52 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="16.46 9.96 17.43 11.63 18.4 9.96 16.46 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.4 9.96 19.37 11.63 20.34 9.96 18.4 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.34 9.96 21.31 11.63 22.28 9.96 20.34 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="22.28 9.96 23.24 11.63 24.21 9.96 22.28 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.21 9.96 25.18 11.63 26.15 9.96 24.21 9.96"
                  />
                  <polygon
                    className="cls-background-8"
                    points="26.15 9.96 27.12 11.63 28.09 9.96 26.15 9.96"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 9.96 29.06 11.63 30.03 9.96 28.09 9.96"
                  />
                  <polygon
                    className="cls-background-5"
                    points="30.02 13.3 29.05 11.63 28.08 13.3 30.02 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="28.08 13.3 27.11 11.63 26.14 13.3 28.08 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="26.14 13.3 25.17 11.63 24.21 13.3 26.14 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="24.21 13.3 23.24 11.63 22.27 13.3 24.21 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.27 13.3 21.3 11.63 20.33 13.3 22.27 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.33 13.3 19.36 11.63 18.39 13.3 20.33 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 13.3 17.42 11.63 16.45 13.3 18.39 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.45 13.3 15.48 11.63 14.51 13.3 16.45 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.51 13.3 13.54 11.63 12.57 13.3 14.51 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.57 13.3 11.6 11.63 10.63 13.3 12.57 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="10.63 13.3 9.66 11.63 8.7 13.3 10.63 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.7 13.3 7.73 11.63 6.76 13.3 8.7 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.76 13.3 5.79 11.63 4.82 13.3 6.76 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.82 13.3 3.85 11.63 2.88 13.3 4.82 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.88 13.3 1.91 11.63 .94 13.3 2.88 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".94 13.3 -.03 11.63 -1 13.3 .94 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="-.03 11.63 .94 13.3 1.91 11.63 -.03 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="1.91 11.63 2.88 13.3 3.85 11.63 1.91 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.85 11.63 4.82 13.3 5.79 11.63 3.85 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.79 11.63 6.76 13.3 7.73 11.63 5.79 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.73 11.63 8.7 13.3 9.66 11.63 7.73 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="9.66 11.63 10.63 13.3 11.6 11.63 9.66 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.6 11.63 12.57 13.3 13.54 11.63 11.6 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.54 11.63 14.51 13.3 15.48 11.63 13.54 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.48 11.63 16.45 13.3 17.42 11.63 15.48 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.42 11.63 18.39 13.3 19.36 11.63 17.42 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.36 11.63 20.33 13.3 21.3 11.63 19.36 11.63"
                  />
                  <polygon
                    className="cls-background-8"
                    points="21.3 11.63 22.27 13.3 23.24 11.63 21.3 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 11.63 24.21 13.3 25.17 11.63 23.24 11.63"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.17 11.63 26.14 13.3 27.11 11.63 25.17 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.11 11.63 28.08 13.3 29.05 11.63 27.11 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.05 11.63 30.02 13.3 30.99 11.63 29.05 11.63"
                  />
                  <polygon
                    className="cls-background-5"
                    points="31 14.97 30.03 13.3 29.06 14.97 31 14.97"
                  />
                  <polygon
                    className="cls-background-8"
                    points="29.06 14.97 28.09 13.3 27.12 14.97 29.06 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.12 14.97 26.15 13.3 25.18 14.97 27.12 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 14.97 24.21 13.3 23.24 14.97 25.18 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 14.97 22.27 13.3 21.3 14.97 23.24 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="21.3 14.97 20.33 13.3 19.36 14.97 21.3 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.36 14.97 18.39 13.3 17.42 14.97 19.36 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.42 14.97 16.46 13.3 15.49 14.97 17.42 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 14.97 14.52 13.3 13.55 14.97 15.49 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 14.97 12.58 13.3 11.61 14.97 13.55 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 14.97 10.64 13.3 9.67 14.97 11.61 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.67 14.97 8.7 13.3 7.73 14.97 9.67 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.73 14.97 6.76 13.3 5.79 14.97 7.73 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.79 14.97 4.82 13.3 3.85 14.97 5.79 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="3.85 14.97 2.88 13.3 1.91 14.97 3.85 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.91 14.97 .94 13.3 -.02 14.97 1.91 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="-.99 13.3 -.02 14.97 .94 13.3 -.99 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points=".94 13.3 1.91 14.97 2.88 13.3 .94 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.88 13.3 3.85 14.97 4.82 13.3 2.88 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.82 13.3 5.79 14.97 6.76 13.3 4.82 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.76 13.3 7.73 14.97 8.7 13.3 6.76 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.7 13.3 9.67 14.97 10.64 13.3 8.7 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.64 13.3 11.61 14.97 12.58 13.3 10.64 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.58 13.3 13.55 14.97 14.52 13.3 12.58 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 13.3 15.49 14.97 16.46 13.3 14.52 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="16.46 13.3 17.42 14.97 18.39 13.3 16.46 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.39 13.3 19.36 14.97 20.33 13.3 18.39 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.33 13.3 21.3 14.97 22.27 13.3 20.33 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.27 13.3 23.24 14.97 24.21 13.3 22.27 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="24.21 13.3 25.18 14.97 26.15 13.3 24.21 13.3"
                  />
                  <polygon
                    className="cls-background-8"
                    points="26.15 13.3 27.12 14.97 28.09 13.3 26.15 13.3"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 13.3 29.06 14.97 30.03 13.3 28.09 13.3"
                  />
                  <polygon
                    className="cls-background-5"
                    points="30.03 16.64 29.06 14.97 28.09 16.64 30.03 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 16.64 27.12 14.97 26.15 16.64 28.09 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.15 16.64 25.18 14.97 24.21 16.64 26.15 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.21 16.64 23.24 14.97 22.27 16.64 24.21 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.27 16.64 21.3 14.97 20.33 16.64 22.27 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.33 16.64 19.37 14.97 18.4 16.64 20.33 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.4 16.64 17.43 14.97 16.46 16.64 18.4 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 16.64 15.49 14.97 14.52 16.64 16.46 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 16.64 13.55 14.97 12.58 16.64 14.52 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 16.64 11.61 14.97 10.64 16.64 12.58 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.64 16.64 9.67 14.97 8.7 16.64 10.64 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.7 16.64 7.73 14.97 6.76 16.64 8.7 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.76 16.64 5.79 14.97 4.82 16.64 6.76 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.82 16.64 3.85 14.97 2.88 16.64 4.82 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="2.88 16.64 1.92 14.97 .95 16.64 2.88 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".95 16.64 -.02 14.97 -.99 16.64 .95 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-.02 14.97 .95 16.64 1.92 14.97 -.02 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 14.97 2.88 16.64 3.85 14.97 1.92 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="3.85 14.97 4.82 16.64 5.79 14.97 3.85 14.97"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.79 14.97 6.76 16.64 7.73 14.97 5.79 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.73 14.97 8.7 16.64 9.67 14.97 7.73 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.67 14.97 10.64 16.64 11.61 14.97 9.67 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 14.97 12.58 16.64 13.55 14.97 11.61 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 14.97 14.52 16.64 15.49 14.97 13.55 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 14.97 16.46 16.64 17.43 14.97 15.49 14.97"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.43 14.97 18.4 16.64 19.37 14.97 17.43 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.37 14.97 20.33 16.64 21.3 14.97 19.37 14.97"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.3 14.97 22.27 16.64 23.24 14.97 21.3 14.97"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.24 14.97 24.21 16.64 25.18 14.97 23.24 14.97"
                  />
                  <polygon
                    className="cls-background-8"
                    points="25.18 14.97 26.15 16.64 27.12 14.97 25.18 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.12 14.97 28.09 16.64 29.06 14.97 27.12 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.06 14.97 30.03 16.64 31 14.97 29.06 14.97"
                  />
                  <polygon
                    className="cls-background-5"
                    points="31 18.31 30.04 16.64 29.07 18.31 31 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.07 18.31 28.1 16.64 27.13 18.31 29.07 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.13 18.31 26.16 16.64 25.19 18.31 27.13 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="25.19 18.31 24.22 16.64 23.25 18.31 25.19 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.25 18.31 22.28 16.64 21.31 18.31 23.25 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 18.31 20.34 16.64 19.37 18.31 21.31 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.37 18.31 18.4 16.64 17.43 18.31 19.37 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.43 18.31 16.46 16.64 15.49 18.31 17.43 18.31"
                  />
                  <polygon
                    className="cls-background-5"
                    points="15.49 18.31 14.52 16.64 13.55 18.31 15.49 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 18.31 12.58 16.64 11.62 18.31 13.55 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.62 18.31 10.65 16.64 9.68 18.31 11.62 18.31"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.68 18.31 8.71 16.64 7.74 18.31 9.68 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="7.74 18.31 6.77 16.64 5.8 18.31 7.74 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.8 18.31 4.83 16.64 3.86 18.31 5.8 18.31"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.86 18.31 2.89 16.64 1.92 18.31 3.86 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 18.31 .95 16.64 -.02 18.31 1.92 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-.99 16.64 -.02 18.31 .95 16.64 -.99 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".95 16.64 1.92 18.31 2.89 16.64 .95 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.89 16.64 3.86 18.31 4.83 16.64 2.89 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.83 16.64 5.8 18.31 6.77 16.64 4.83 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.77 16.64 7.74 18.31 8.71 16.64 6.77 16.64"
                  />
                  <polygon
                    className="cls-background-5"
                    points="8.71 16.64 9.68 18.31 10.65 16.64 8.71 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="10.65 16.64 11.62 18.31 12.58 16.64 10.65 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 16.64 13.55 18.31 14.52 16.64 12.58 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="14.52 16.64 15.49 18.31 16.46 16.64 14.52 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 16.64 17.43 18.31 18.4 16.64 16.46 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.4 16.64 19.37 18.31 20.34 16.64 18.4 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.34 16.64 21.31 18.31 22.28 16.64 20.34 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.28 16.64 23.25 18.31 24.22 16.64 22.28 16.64"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.22 16.64 25.19 18.31 26.16 16.64 24.22 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.16 16.64 27.13 18.31 28.1 16.64 26.16 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.1 16.64 29.07 18.31 30.04 16.64 28.1 16.64"
                  />
                  <polygon
                    className="cls-background-4"
                    points="30.03 19.98 29.06 18.31 28.09 19.98 30.03 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 19.98 27.12 18.31 26.15 19.98 28.09 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="26.15 19.98 25.18 18.31 24.21 19.98 26.15 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="24.21 19.98 23.24 18.31 22.27 19.98 24.21 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.27 19.98 21.3 18.31 20.33 19.98 22.27 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.33 19.98 19.36 18.31 18.39 19.98 20.33 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="18.39 19.98 17.42 18.31 16.46 19.98 18.39 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 19.98 15.49 18.31 14.52 19.98 16.46 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="14.52 19.98 13.55 18.31 12.58 19.98 14.52 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 19.98 11.61 18.31 10.64 19.98 12.58 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.64 19.98 9.67 18.31 8.7 19.98 10.64 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="8.7 19.98 7.73 18.31 6.76 19.98 8.7 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.76 19.98 5.79 18.31 4.82 19.98 6.76 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.82 19.98 3.85 18.31 2.88 19.98 4.82 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.88 19.98 1.91 18.31 .94 19.98 2.88 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".94 19.98 -.03 18.31 -1 19.98 .94 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-.03 18.31 .94 19.98 1.91 18.31 -.03 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="1.91 18.31 2.88 19.98 3.85 18.31 1.91 18.31"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.85 18.31 4.82 19.98 5.79 18.31 3.85 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="5.79 18.31 6.76 19.98 7.73 18.31 5.79 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="7.73 18.31 8.7 19.98 9.67 18.31 7.73 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="9.67 18.31 10.64 19.98 11.61 18.31 9.67 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 18.31 12.58 19.98 13.55 18.31 11.61 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 18.31 14.52 19.98 15.49 18.31 13.55 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="15.49 18.31 16.46 19.98 17.42 18.31 15.49 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.42 18.31 18.39 19.98 19.36 18.31 17.42 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.36 18.31 20.33 19.98 21.3 18.31 19.36 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.3 18.31 22.27 19.98 23.24 18.31 21.3 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.24 18.31 24.21 19.98 25.18 18.31 23.24 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 18.31 26.15 19.98 27.12 18.31 25.18 18.31"
                  />
                  <polygon
                    className="cls-background-8"
                    points="27.12 18.31 28.09 19.98 29.06 18.31 27.12 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.06 18.31 30.03 19.98 31 18.31 29.06 18.31"
                  />
                  <polygon
                    className="cls-background-4"
                    points="31 21.65 30.03 19.98 29.06 21.65 31 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.06 21.65 28.09 19.98 27.12 21.65 29.06 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.12 21.65 26.15 19.98 25.18 21.65 27.12 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 21.65 24.22 19.98 23.25 21.65 25.18 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.25 21.65 22.28 19.98 21.31 21.65 23.25 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 21.65 20.34 19.98 19.37 21.65 21.31 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="19.37 21.65 18.4 19.98 17.43 21.65 19.37 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.43 21.65 16.46 19.98 15.49 21.65 17.43 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 21.65 14.52 19.98 13.55 21.65 15.49 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="13.55 21.65 12.58 19.98 11.61 21.65 13.55 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 21.65 10.64 19.98 9.67 21.65 11.61 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.67 21.65 8.7 19.98 7.73 21.65 9.67 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="7.73 21.65 6.77 19.98 5.8 21.65 7.73 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="5.8 21.65 4.83 19.98 3.86 21.65 5.8 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="3.86 21.65 2.89 19.98 1.92 21.65 3.86 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 21.65 .95 19.98 -.02 21.65 1.92 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-.99 19.98 -.02 21.65 .95 19.98 -.99 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".95 19.98 1.92 21.65 2.89 19.98 .95 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.89 19.98 3.86 21.65 4.83 19.98 2.89 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="4.83 19.98 5.8 21.65 6.77 19.98 4.83 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.77 19.98 7.73 21.65 8.7 19.98 6.77 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.7 19.98 9.67 21.65 10.64 19.98 8.7 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="10.64 19.98 11.61 21.65 12.58 19.98 10.64 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.58 19.98 13.55 21.65 14.52 19.98 12.58 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 19.98 15.49 21.65 16.46 19.98 14.52 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 19.98 17.43 21.65 18.4 19.98 16.46 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.4 19.98 19.37 21.65 20.34 19.98 18.4 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="20.34 19.98 21.31 21.65 22.28 19.98 20.34 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.28 19.98 23.25 21.65 24.22 19.98 22.28 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.22 19.98 25.18 21.65 26.15 19.98 24.22 19.98"
                  />
                  <polygon
                    className="cls-background-8"
                    points="26.15 19.98 27.12 21.65 28.09 19.98 26.15 19.98"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 19.98 29.06 21.65 30.03 19.98 28.09 19.98"
                  />
                  <polygon
                    className="cls-background-5"
                    points="30.03 23.32 29.06 21.65 28.09 23.32 30.03 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.09 23.32 27.12 21.65 26.16 23.32 28.09 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.16 23.32 25.19 21.65 24.22 23.32 26.16 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.22 23.32 23.25 21.65 22.28 23.32 24.22 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.28 23.32 21.31 21.65 20.34 23.32 22.28 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.34 23.32 19.37 21.65 18.4 23.32 20.34 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.4 23.32 17.43 21.65 16.46 23.32 18.4 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 23.32 15.49 21.65 14.52 23.32 16.46 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 23.32 13.55 21.65 12.58 23.32 14.52 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.58 23.32 11.61 21.65 10.64 23.32 12.58 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.64 23.32 9.67 21.65 8.71 23.32 10.64 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.71 23.32 7.74 21.65 6.77 23.32 8.71 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="6.77 23.32 5.8 21.65 4.83 23.32 6.77 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="4.83 23.32 3.86 21.65 2.89 23.32 4.83 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.89 23.32 1.92 21.65 .95 23.32 2.89 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".95 23.32 -.02 21.65 -.99 23.32 .95 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="-.02 21.65 .95 23.32 1.92 21.65 -.02 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="1.92 21.65 2.89 23.32 3.86 21.65 1.92 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="3.86 21.65 4.83 23.32 5.8 21.65 3.86 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="5.8 21.65 6.77 23.32 7.74 21.65 5.8 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.74 21.65 8.71 23.32 9.67 21.65 7.74 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.67 21.65 10.64 23.32 11.61 21.65 9.67 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="11.61 21.65 12.58 23.32 13.55 21.65 11.61 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="13.55 21.65 14.52 23.32 15.49 21.65 13.55 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 21.65 16.46 23.32 17.43 21.65 15.49 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="17.43 21.65 18.4 23.32 19.37 21.65 17.43 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.37 21.65 20.34 23.32 21.31 21.65 19.37 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 21.65 22.28 23.32 23.25 21.65 21.31 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.25 21.65 24.22 23.32 25.19 21.65 23.25 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="25.19 21.65 26.16 23.32 27.12 21.65 25.19 21.65"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.12 21.65 28.09 23.32 29.06 21.65 27.12 21.65"
                  />
                  <polygon
                    className="cls-background-8"
                    points="29.06 21.65 30.03 23.32 31 21.65 29.06 21.65"
                  />
                  <polygon
                    className="cls-background-4"
                    points="31.01 25 30.04 23.32 29.07 25 31.01 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="29.07 25 28.1 23.32 27.13 25 29.07 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.13 25 26.16 23.32 25.19 25 27.13 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.19 25 24.22 23.32 23.25 25 25.19 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.25 25 22.28 23.32 21.31 25 23.25 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="21.31 25 20.34 23.32 19.37 25 21.31 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.37 25 18.41 23.32 17.44 25 19.37 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="17.44 25 16.47 23.32 15.5 25 17.44 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="15.5 25 14.53 23.32 13.56 25 15.5 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="13.56 25 12.59 23.32 11.62 25 13.56 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="11.62 25 10.65 23.32 9.68 25 11.62 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.68 25 8.71 23.32 7.74 25 9.68 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.74 25 6.77 23.32 5.8 25 7.74 25"
                  />
                  <polygon className="cls-background-8" points="5.8 25 4.83 23.32 3.86 25 5.8 25" />
                  <polygon
                    className="cls-background-4"
                    points="3.86 25 2.89 23.32 1.92 25 3.86 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 25 .96 23.32 -.01 25 1.92 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="-.98 23.32 -.01 25 .96 23.32 -.98 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".96 23.32 1.92 25 2.89 23.32 .96 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.89 23.32 3.86 25 4.83 23.32 2.89 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.83 23.32 5.8 25 6.77 23.32 4.83 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.77 23.32 7.74 25 8.71 23.32 6.77 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.71 23.32 9.68 25 10.65 23.32 8.71 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.65 23.32 11.62 25 12.59 23.32 10.65 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.59 23.32 13.56 25 14.53 23.32 12.59 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.53 23.32 15.5 25 16.47 23.32 14.53 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.47 23.32 17.44 25 18.41 23.32 16.47 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.41 23.32 19.37 25 20.34 23.32 18.41 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.34 23.32 21.31 25 22.28 23.32 20.34 23.32"
                  />
                  <polygon
                    className="cls-background-8"
                    points="22.28 23.32 23.25 25 24.22 23.32 22.28 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.22 23.32 25.19 25 26.16 23.32 24.22 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.16 23.32 27.13 25 28.1 23.32 26.16 23.32"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.1 23.32 29.07 25 30.04 23.32 28.1 23.32"
                  />
                  <polygon
                    className="cls-background-5"
                    points="30.03 26.66 29.06 25 28.09 26.66 30.03 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="28.09 26.66 27.12 25 26.15 26.66 28.09 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.15 26.66 25.18 25 24.21 26.66 26.15 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="24.21 26.66 23.24 25 22.28 26.66 24.21 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="22.28 26.66 21.31 25 20.34 26.66 22.28 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="20.34 26.66 19.37 25 18.4 26.66 20.34 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="18.4 26.66 17.43 25 16.46 26.66 18.4 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 26.66 15.49 25 14.52 26.66 16.46 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="14.52 26.66 13.55 25 12.58 26.66 14.52 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.58 26.66 11.61 25 10.64 26.66 12.58 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="10.64 26.66 9.67 25 8.7 26.66 10.64 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="8.7 26.66 7.73 25 6.76 26.66 8.7 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.76 26.66 5.79 25 4.82 26.66 6.76 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="4.82 26.66 3.86 25 2.89 26.66 4.82 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="2.89 26.66 1.92 25 .95 26.66 2.89 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points=".95 26.66 -.02 25 -.99 26.66 .95 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="-.02 25 .95 26.66 1.92 25 -.02 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 25 2.89 26.66 3.86 25 1.92 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="3.86 25 4.82 26.66 5.79 25 3.86 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.79 25 6.76 26.66 7.73 25 5.79 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.73 25 8.7 26.66 9.67 25 7.73 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.67 25 10.64 26.66 11.61 25 9.67 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="11.61 25 12.58 26.66 13.55 25 11.61 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 25 14.52 26.66 15.49 25 13.55 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="15.49 25 16.46 26.66 17.43 25 15.49 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="17.43 25 18.4 26.66 19.37 25 17.43 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="19.37 25 20.34 26.66 21.31 25 19.37 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 25 22.28 26.66 23.24 25 21.31 25"
                  />
                  <polygon
                    className="cls-background-8"
                    points="23.24 25 24.21 26.66 25.18 25 23.24 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.18 25 26.15 26.66 27.12 25 25.18 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.12 25 28.09 26.66 29.06 25 27.12 25"
                  />
                  <polygon
                    className="cls-background-5"
                    points="29.06 25 30.03 26.66 31 25 29.06 25"
                  />
                  <polygon
                    className="cls-background-4"
                    points="31 28.33 30.04 26.66 29.07 28.33 31 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="29.07 28.33 28.1 26.66 27.13 28.33 29.07 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="27.13 28.33 26.16 26.66 25.19 28.33 27.13 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.19 28.33 24.22 26.66 23.25 28.33 25.19 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="23.25 28.33 22.28 26.66 21.31 28.33 23.25 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="21.31 28.33 20.34 26.66 19.37 28.33 21.31 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="19.37 28.33 18.4 26.66 17.43 28.33 19.37 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.43 28.33 16.46 26.66 15.49 28.33 17.43 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="15.49 28.33 14.52 26.66 13.55 28.33 15.49 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.55 28.33 12.59 26.66 11.62 28.33 13.55 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="11.62 28.33 10.65 26.66 9.68 28.33 11.62 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.68 28.33 8.71 26.66 7.74 28.33 9.68 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="7.74 28.33 6.77 26.66 5.8 28.33 7.74 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.8 28.33 4.83 26.66 3.86 28.33 5.8 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="3.86 28.33 2.89 26.66 1.92 28.33 3.86 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 28.33 .95 26.66 -.02 28.33 1.92 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="-.99 26.66 -.02 28.33 .95 26.66 -.99 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points=".95 26.66 1.92 28.33 2.89 26.66 .95 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="2.89 26.66 3.86 28.33 4.83 26.66 2.89 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="4.83 26.66 5.8 28.33 6.77 26.66 4.83 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="6.77 26.66 7.74 28.33 8.71 26.66 6.77 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="8.71 26.66 9.68 28.33 10.65 26.66 8.71 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="10.65 26.66 11.62 28.33 12.59 26.66 10.65 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="12.59 26.66 13.55 28.33 14.52 26.66 12.59 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="14.52 26.66 15.49 28.33 16.46 26.66 14.52 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="16.46 26.66 17.43 28.33 18.4 26.66 16.46 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.4 26.66 19.37 28.33 20.34 26.66 18.4 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="20.34 26.66 21.31 28.33 22.28 26.66 20.34 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.28 26.66 23.25 28.33 24.22 26.66 22.28 26.66"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.22 26.66 25.19 28.33 26.16 26.66 24.22 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.16 26.66 27.13 28.33 28.1 26.66 26.16 26.66"
                  />
                  <polygon
                    className="cls-background-4"
                    points="28.1 26.66 29.07 28.33 30.04 26.66 28.1 26.66"
                  />
                  <polygon
                    className="cls-background-5"
                    points="30.04 30 29.07 28.33 28.1 30 30.04 30"
                  />
                  <polygon
                    className="cls-background-5"
                    points="28.1 30 27.13 28.33 26.16 30 28.1 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="26.16 30 25.19 28.33 24.22 30 26.16 30"
                  />
                  <polygon
                    className="cls-background-8"
                    points="24.22 30 23.25 28.33 22.28 30 24.22 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="22.28 30 21.31 28.33 20.34 30 22.28 30"
                  />
                  <polygon
                    className="cls-background-8"
                    points="20.34 30 19.37 28.33 18.4 30 20.34 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="18.4 30 17.43 28.33 16.46 30 18.4 30"
                  />
                  <polygon
                    className="cls-background-5"
                    points="16.46 30 15.5 28.33 14.53 30 16.46 30"
                  />
                  <polygon
                    className="cls-background-8"
                    points="14.53 30 13.56 28.33 12.59 30 14.53 30"
                  />
                  <polygon
                    className="cls-background-8"
                    points="12.59 30 11.62 28.33 10.65 30 12.59 30"
                  />
                  <polygon
                    className="cls-background-5"
                    points="10.65 30 9.68 28.33 8.71 30 10.65 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="8.71 30 7.74 28.33 6.77 30 8.71 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="6.77 30 5.8 28.33 4.83 30 6.77 30"
                  />
                  <polygon
                    className="cls-background-5"
                    points="4.83 30 3.86 28.33 2.89 30 4.83 30"
                  />
                  <polygon
                    className="cls-background-4"
                    points="2.89 30 1.92 28.33 .95 30 2.89 30"
                  />
                  <polygon className="cls-background-5" points=".95 30 -.02 28.33 -.98 30 .95 30" />
                  <polygon
                    className="cls-background-4"
                    points="-.02 28.33 .95 30 1.92 28.33 -.02 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="1.92 28.33 2.89 30 3.86 28.33 1.92 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="3.86 28.33 4.83 30 5.8 28.33 3.86 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="5.8 28.33 6.77 30 7.74 28.33 5.8 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="7.74 28.33 8.71 30 9.68 28.33 7.74 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="9.68 28.33 10.65 30 11.62 28.33 9.68 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="11.62 28.33 12.59 30 13.56 28.33 11.62 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="13.56 28.33 14.53 30 15.5 28.33 13.56 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="15.5 28.33 16.46 30 17.43 28.33 15.5 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="17.43 28.33 18.4 30 19.37 28.33 17.43 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="19.37 28.33 20.34 30 21.31 28.33 19.37 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="21.31 28.33 22.28 30 23.25 28.33 21.31 28.33"
                  />
                  <polygon
                    className="cls-background-5"
                    points="23.25 28.33 24.22 30 25.19 28.33 23.25 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="25.19 28.33 26.16 30 27.13 28.33 25.19 28.33"
                  />
                  <polygon
                    className="cls-background-4"
                    points="27.13 28.33 28.1 30 29.07 28.33 27.13 28.33"
                  />
                  <polygon
                    className="cls-background-8"
                    points="29.07 28.33 30.04 30 31.01 28.33 29.07 28.33"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
