import Image from "next/image";
import styles from "../../styles/Pokemon.module.css";

import { useRouter } from "next/router";

export const getStaticPaths = async() => {
    const maxPokemons = 251;
    const api = 'https://pokeapi.co/api/v2/pokemon/';
    const res = await fetch(`${api}/?limit=${maxPokemons}`);
  
    const data = await res.json();
    //params
    const paths = data.results.map((pokemon, index) => {
        return {
            params: {
                pokemonId: (index+1).toString()
            }
        }
    })
    
    return {
        paths,
        fallback: true //com false carrega apenas os pokemons da listagem maxima 251, se true pode carregar mais mas adapta com o useRouter.isFallback
    }
}

export const getStaticProps = async(context) => {
    const id = context.params.pokemonId;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await res.json();

    return {
        props: {pokemon: data},
    }

}

export default function Pokemon({pokemon}){
    const router = useRouter();

    if(router.isFallback){
        return <div>Carregando...</div>
    }

    return(
        <div className={styles.pokemon}>
            <h1>{pokemon.name}</h1>
            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
                width="120"
                height="120"
                alt={pokemon.name}
            />
            <div className={styles.numero}>
                <h3>Número Pokedex</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div>
                    {pokemon.types.map((element) => (
                       <span className={`${styles.tipo} ${styles['type_' + element.type.name]}`} key={element.slot}>
                           {element.type.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.numero}>
                <h3>Altura</h3>
                <p>{pokemon.height * 10} cm</p>
            </div>
            <div className={styles.numero}>
                <h3>Peso</h3>
                <p>{pokemon.weight / 10} kg</p>
            </div>
        </div>
    )
}